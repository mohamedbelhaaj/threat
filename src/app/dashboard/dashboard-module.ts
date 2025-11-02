import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocDashboard } from './soc-dashboard/soc-dashboard';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocDashboard,
    AdminDashboard
  ]
})
export class DashboardModule { }
