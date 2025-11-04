import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';




import { AdminDashboard } from './admin/admin-dashboard/admin-dashboard';
import { SocDashboard } from './soc/soc-dashboard/soc-dashboard';
import { ThreatScanner } from './soc/threat-scanner/threat-scanner';
import { ThreatDetected } from './soc/threat-detected/threat-detected';
import { Chatbot } from './soc/chatbot/chatbot';
import { Alerts } from './soc/alerts/alerts';
import { Reports } from './soc/reports/reports';
import { TaskManagement } from './admin/task-management/task-management';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SocDashboard, 
    Chatbot,
    Alerts,
    AdminDashboard,
    ThreatScanner,
    ThreatDetected,
    Reports,
    TaskManagement

  ]
})
export class DashboardModule { }
