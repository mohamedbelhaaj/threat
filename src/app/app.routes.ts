import { Routes } from '@angular/router';
import { AdminDashboard } from './dashboard/admin-dashboard/admin-dashboard';
import { SocDashboard } from './dashboard/soc-dashboard/soc-dashboard';
import { Login } from './user-login/login/login';

export const routes: Routes = [
    {path:'soc',component:SocDashboard},
    {path:'admin', component:AdminDashboard},
    {path:'', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: Login},
];
