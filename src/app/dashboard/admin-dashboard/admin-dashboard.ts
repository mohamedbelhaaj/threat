import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  imports: [CommonModule,
      FormsModule,
      RouterModule],
  templateUrl: './admin-dashboard.html',
  styleUrl: './admin-dashboard.css',
})
export class AdminDashboard {
    assignTask = [
    { title: 'Analyser les alertes', description: 'Vérifier les logs du SIEM', priority: 'high', status: 'En cours', selectedAnalyst: '' },
    { title: 'Mettre à jour les règles', description: 'Optimiser la détection IDS', priority: 'medium', status: 'Ouvert', selectedAnalyst: '' },
  ];

  // 🔹 Tableau des analystes
  analysts = [
    { userId: 1, email: 'analyst1@soc.com' },
    { userId: 2, email: 'analyst2@soc.com' },
  ];

currentUserId: any;
generateSystemReport() {
throw new Error('Method not implemented.');
}
newUser: any;
userModalVisible: any;
loading: any;
createUser() {
throw new Error('Method not implemented.');
}
creating: any;
filterUsers() {
throw new Error('Method not implemented.');
}
users: any;
userFilter: any;
toggleServerModal() {
throw new Error('Method not implemented.');
}
servers: any;
viewServerLogs(arg0: any) {
throw new Error('Method not implemented.');
}
restartServer(arg0: any) {
throw new Error('Method not implemented.');
}
deleteServer(arg0: any) {
throw new Error('Method not implemented.');
}
toggleTaskModal() {
throw new Error('Method not implemented.');
}

toggleFirewallModal() {
throw new Error('Method not implemented.');
}
stats: any;
viewBlockedIPs() {
throw new Error('Method not implemented.');
}
viewBlockedDomains() {
throw new Error('Method not implemented.');
}
dbStatus: any;
authStatus: any;
systemHealth: any;
activities: any;
activityFilter: any;
runHealthCheck() {
throw new Error('Method not implemented.');
}
storageStatus: any;
toggleChatbot() {
throw new Error('Method not implemented.');
}

}

