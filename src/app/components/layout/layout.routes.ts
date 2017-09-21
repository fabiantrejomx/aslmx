import { Routes, RouterModule }  from '@angular/router';
import { Layout } from './layout.component';

const routes: Routes = [
  { path: '', component: Layout, children: [
    { path: '', redirectTo: 'add-person', pathMatch: 'full' },
    { path: 'dashboard', loadChildren: '../dashboard/dashboard.module#DashboardModule' },
    { path: 'person', loadChildren: '../add-person/add-person.module#AddPersonModule' },
  ]}
];

export const ROUTES = RouterModule.forChild(routes);
