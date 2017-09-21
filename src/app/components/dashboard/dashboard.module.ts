import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';

import { RouterModule } from '@angular/router';
import { BrigadeTableModule } from '../brigade/brigade-table.module';

import { Dashboard } from './dashboard.component';

export const routes = [
  { path: '', component: Dashboard, pathMatch: 'full' }
];


@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BrigadeTableModule
  ],
  declarations: [
    Dashboard
  ]
})
export class DashboardModule {
  static routes = routes;
}
