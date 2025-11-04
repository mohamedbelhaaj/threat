import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IpBlocking } from './ip-blocking/ip-blocking';
import { TaskManagement } from './task-management/task-management';
import { ServerManagement } from './server-management/server-management';
import { AdminDashboard } from './admin-dashboard/admin-dashboard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    IpBlocking,
    ServerManagement,
    AdminDashboard
  ]
})
export class AdminModule { }
