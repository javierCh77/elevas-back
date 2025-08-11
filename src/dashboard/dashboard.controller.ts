import { Controller, Get, Query } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { ResumenDashboard } from './types';

@Controller('dashboard')
export class DashboardController {
  constructor(private readonly dashboard: DashboardService) {}

  /** GET /dashboard/resumen?days=14 */
  @Get('resumen')
  async getResumen(
    @Query('days') daysParam?: string,
  ): Promise<ResumenDashboard> {
    const days = Math.max(1, Math.min(120, Number(daysParam) || 14)); // 1..120 días
    return this.dashboard.getResumen(days);
  }
}
