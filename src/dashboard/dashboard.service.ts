// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';

import { Empleado } from '../empleados/entities/empleado.entity'; // ← ajusta la ruta
import { Empresa } from '../empresas/entities/empresa.entity';   // ← ajusta la ruta
import { ResumenDashboard, SerieCategoria, SerieFecha } from './types';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Empleado) private readonly empRepo: Repository<Empleado>,
    @InjectRepository(Empresa) private readonly empresaRepo: Repository<Empresa>,
  ) {}

  /**
   * Resumen principal para el dashboard.
   * GET /dashboard/resumen?days=14
   */
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
      .select('COALESCE(em.razonSocial, :sin) as category')
      .setParameter('sin', 'Sin empresa')
      .addSelect('COUNT(e.id)::int', 'value')
      .groupBy('em.razonSocial')
      .orderBy('value', 'DESC')
      .getRawMany<{ category: string; value: string }>();

    const arr = raw.map(r => ({ category: r.category, value: Number(r.value) }));
    const top5 = arr.slice(0, 5);
    const otros = arr.slice(5).reduce((acc, x) => acc + x.value, 0);
    return otros > 0 ? [...top5, { category: 'Otros', value: otros }] : top5;
  }

  /** Line chart: ingresos por día (últimos N días). `fechaIngreso` es DATE. */
  private async serieIngresosUltimosDias(days: number): Promise<SerieFecha[]> {
    const { from, to } = this.dayWindow(days);

    const raw = await this.empRepo
      .createQueryBuilder('e')
      .select('e.fechaIngreso', 'd')                  // e.fechaIngreso (DATE)
      .addSelect('COUNT(e.id)::int', 'value')
      .where('e.fechaIngreso IS NOT NULL')
      .andWhere('e.fechaIngreso >= :from AND e.fechaIngreso < :to', { from, to })
      .groupBy('e.fechaIngreso')
      .orderBy('d', 'ASC')
      .getRawMany<{ d: string; value: string }>();

    const counts = new Map<string, number>();
    for (const r of raw) counts.set(r.d, Number(r.value));

    const daysList = this.listLastDays(days, to);
    return daysList.map(date => ({ date, value: counts.get(date) || 0 }));
  }

  /** Donut chart: distribución por estadoActual. */
  private async serieEmpleadosPorEstado(): Promise<SerieCategoria[]> {
    const raw = await this.empRepo
      .createQueryBuilder('e')
      .select('COALESCE(e.estadoActual, :sin)', 'category')
      .addSelect('COUNT(e.id)::int', 'value')
      .setParameters({ sin: 'SIN ESTADO' })
      .groupBy('e.estadoActual')
      .orderBy('value', 'DESC')
      .getRawMany<{ category: string; value: string }>();

    return raw.map(r => ({ category: r.category, value: Number(r.value) }));
  }

  /**
   * KPI Cobertura de CV: porcentaje de empleados con cvUrl (si existe la columna).
   * Si la columna no existe aún, retornamos null y el front decide ocultar el KPI.
   */
  private async tryCoberturaCv(total: number): Promise<number | null> {
    if (!total) return 0;
    try {
      const withCv = await this.empRepo
        .createQueryBuilder('e')
        .where(`e."cvUrl" IS NOT NULL AND e."cvUrl" <> ''`)
        .getCount();
      return withCv / total;
    } catch {
      return null;
    }
  }

  /**
   * KPI Variación mensual: (ingresos mes actual vs mes anterior).
   * Usa `fechaIngreso` de tipo DATE.
   */
  private async variacionMesActualVsAnterior(): Promise<number> {
    const now = new Date();
    const startThis = new Date(now.getFullYear(), now.getMonth(), 1);
    const startNext = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    const startPrev = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    const [prev, thisMonth] = await Promise.all([
      this.empRepo.count({
        where: { fechaIngreso: Between(startPrev, startThis) } as any,
      }),
      this.empRepo.count({
        where: { fechaIngreso: Between(startThis, startNext) } as any,
      }),
    ]);

    if (prev === 0) return thisMonth > 0 ? 1 : 0;
    return (thisMonth - prev) / prev;
  }

  /* ---------------- helpers de fechas ---------------- */

  /**
   * Ventana de días [from, to) donde `to` es mañana a las 00:00 (exclusivo),
   * y `from` es `days` días antes.
   */
  private dayWindow(days: number) {
    const to = new Date();
    to.setHours(0, 0, 0, 0);
    to.setDate(to.getDate() + 1); // exclusivo
    const from = new Date(to);
    from.setDate(to.getDate() - days);
    return { from, to };
  }

  /** Lista YYYY-MM-DD de los últimos N días terminando en `to - 1 día`. */
  private listLastDays(days: number, to: Date): string[] {
    const out: string[] = [];
    const end = new Date(to);
    end.setDate(end.getDate() - 1); // último día incluido
    for (let i = days - 1; i >= 0; i--) {
      const d = new Date(end);
      d.setDate(end.getDate() - i);
      out.push(this.formatYMD(d));
    }
    return out;
  }

  private formatYMD(d: Date): string {
    const y = d.getFullYear();
    const m = String(d.getMonth() + 1).padStart(2, '0');
    const dd = String(d.getDate()).padStart(2, '0');
    return `${y}-${m}-${dd}`;
  }
}
