export type SerieCategoria = { category: string; value: number };
export type SerieFecha = { date: string; value: number };

export type ResumenDashboard = {
  empresas: number;
  empleadosTotales: number;
  empleadosActivos: number;
  coberturaCv: number | null;        // (0..1) o null si no hay columna
  variacionMensual: number;          // ej: 0.12 = +12%

  empleadosPorEmpresa: SerieCategoria[]; // Column chart
  ingresosPorDia: SerieFecha[];          // Line chart (últimos N días)
  empleadosPorEstado: SerieCategoria[];  // Donut chart
};
