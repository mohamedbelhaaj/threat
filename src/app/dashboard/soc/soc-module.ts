import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Chatbot } from './chatbot/chatbot';
import { Reports } from './reports/reports';
import { ThreatDetected } from './threat-detected/threat-detected';
import { ThreatScanner } from './threat-scanner/threat-scanner';
import { Alerts } from './alerts/alerts';
import { SocDashboard } from './soc-dashboard/soc-dashboard';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Chatbot,
    ThreatDetected,
    ThreatScanner,
    Alerts,
    SocDashboard,
  ]
})
export class SocModule { }
