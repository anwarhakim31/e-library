import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';

@Controller('/api/dashboard')
export class DashboardController {
  constructor(private dashboardService: DashboardService) {}

  @Get()
  async getDashboard() {
    return await this.dashboardService.getDashboard();
  }
}
