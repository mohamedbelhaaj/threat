import { Routes } from '@angular/router';
import { Login } from './user-login/login/login';
import { SocDashboard } from './dashboard/soc/soc-dashboard/soc-dashboard';
import { AdminDashboard } from './dashboard/admin/admin-dashboard/admin-dashboard';
import { Reports } from './dashboard/soc/reports/reports';
import { TaskManagement } from './dashboard/admin/task-management/task-management';
import { Notifications } from './notifications/notifications';

export const routes: Routes = [
    {path:'soc',component:SocDashboard},
    {path:'admin', component:AdminDashboard},
        {path:'reports' , component:Reports},

    {path:'', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login},
    {path:'task' , component:TaskManagement},
    {path:'notification', component:Notifications}
];