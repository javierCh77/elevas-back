// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, DataSource, Repository } from 'typeorm';

import { Empleado } from '../empleados/entities/empleado.entity';
import { Empresa } from '../empresas/entities/empresa.entity';
import { ResumenDashboard, SerieCategoria, SerieFecha } from './types';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Empleado) private readonly empRepo: Repository<Empleado>,
    @InjectRepository(Empresa) private readonly empresaRepo: Repository<Empresa>,
    private readonly dataSource: DataSource
  ) {}

  /** Resumen principal para el dashboard. GET /dashboard/resumen?days=14 */
  async getResumen(days: number): Promise<ResumenDashboard> {
    const [empresas, empleadosTotales, empleadosActivos] = await Promise.all([
      this.empresaRepo.count(),
      this.empRepo.count(),
      this.empRepo.count({ where: { estadoActual: 'ACTIVO' as any } }),
    ]);

    const coberturaCv = await this.tryCoberturaCv(empleadosTotales);
    const variacionMensual = await this.variacionMesActualVsAnterior();

    const [empleadosPorEmpresa, ingresosPorDia, empleadosPorEstado] =
      await Promise.all([
        this.serieEmpleadosPorEmpresa(),
        this.serieIngresosUltimosDias(days),
        this.serieEmpleadosPorEstado(),
      ]);

    return {
      empresas,
      empleadosTotales,
      empleadosActivos,
      coberturaCv,
      variacionMensual,
      empleadosPorEmpresa,
      ingresosPorDia,
      empleadosPorEstado,
    };
  }

  /** Column chart: empleados por empresa (Top 5 + "Otros") */
  private async serieEmpleadosPorEmpresa(): Promise<SerieCategoria[]> {
    const raw = await this.empRepo
      .createQueryBuilder('e')
      .leftJoin('e.empresa', 'em')
      .select(`COALESCE("em"."razonSocial", :sin)`, 'category')
      .setParameter('sin', 'Sin empresa')
      .addSelect('COUNT("e"."id")::int', 'value')
      .groupBy(`"em"."razonSocial"`)
      .orderBy('value', 'DESC')
      .getRawMany<{ category: string; value: string }>();

    const arr = raw.map(r => ({ category: r.category, value: Number(r.value) }));
    const top5 = arr.slice(0, 5);
    const otros = arr.slice(5).reduce((acc, x) => acc + x.value, 0);
    return otros > 0 ? [...top5, { category: 'Otros', value: otros }] : top5;
  }

  private async serieIngresosUltimosDias(days: number): Promise<SerieFecha[]> {
  const sql = `
    WITH params AS (
      SELECT 
        (current_date - make_interval(days => $1::int))::date AS fecha_desde,
        (current_date + interval '1 day')::date            AS fecha_hasta
    )
    SELECT
      d::date AS date,
      COALESCE(c.value, 0)::int AS value
    FROM (
      SELECT generate_series(
        (SELECT fecha_desde FROM params),
        (SELECT fecha_hasta FROM params) - interval '1 day',
        interval '1 day'
      ) AS d
    ) gen
    LEFT JOIN (
      SELECT 
        DATE("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/Argentina/Ushuaia') AS dia,
        COUNT(id)::int AS value
      FROM empleado
      WHERE DATE("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/Argentina/Ushuaia')
            >= (SELECT fecha_desde FROM params)
        AND DATE("createdAt" AT TIME ZONE 'UTC' AT TIME ZONE 'America/Argentina/Ushuaia')
            <  (SELECT fecha_hasta FROM params)
      GROUP BY dia
    ) c
      ON gen.d = c.dia
    ORDER BY d;
  `;

  const rows: { date: string; value: number }[] =
    await this.dataSource.query(sql, [days]); // 👈 pasá un número, p.ej. 14

  return rows.map(r => ({ date: r.date, value: Number(r.value) || 0 }));
}


  /** Donut chart: distribución por estadoActual (ENUM → texto). */
  private async serieEmpleadosPorEstado(): Promise<SerieCategoria[]> {
    const raw = await this.empRepo
      .createQueryBuilder('e')
      .select(
        `CASE 
           WHEN "e"."estadoActual" IS NULL THEN 'SIN ESTADO' 
           ELSE "e"."estadoActual"::text 
         END`,
        'category',
      )
      .addSelect('COUNT("e"."id")::int', 'value')
      .groupBy(`"e"."estadoActual"`)
      .orderBy('value', 'DESC')
      .getRawMany<{ category: string; value: string }>();

    return raw.map(r => ({ category: r.category, value: Number(r.value) }));
  }

  /** KPI Cobertura de CV: porcentaje de empleados con cvUrl */
  private async tryCoberturaCv(total: number): Promise<number | null> {
    if (!total) return 0;
    try {
      const withCv = await this.empRepo
        .createQueryBuilder('e')
        .where(`"e"."cvUrl" IS NOT NULL AND "e"."cvUrl" <> ''`)
        .getCount();
      return withCv / total;
    } catch {
      return null;
    }
  }

  /** KPI Variación mensual: (altas mes actual vs mes anterior). */
  private async variacionMesActualVsAnterior(): Promise<number> {
    const now = new Date();
    const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
    const startNext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [prev, thisMonth] = await Promise.all([
      this.empRepo.count({ where: { createdAt: Between(startPrev, startThis) } as any }),
      this.empRepo.count({ where: { createdAt: Between(startThis, startNext) } as any }),
    ]);

    if (prev === 0) return thisMonth > 0 ? 1 : 0;
    return (thisMonth - prev) / prev;
  }
}
