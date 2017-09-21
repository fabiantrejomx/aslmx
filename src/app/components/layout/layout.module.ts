import 'jquery-slimscroll';

import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { FormsModule }  from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ROUTES }       from './layout.routes';
import { Http, HttpModule, RequestOptions } from '@angular/http';

import { Layout } from './layout.component';
import { Sidebar } from './sidebar/sidebar.component';
import { SharedModule } from './../../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    ROUTES,
    FormsModule,
    SharedModule
  ],
  declarations: [
    Layout,
    Sidebar
  ]
})
export class LayoutModule {
}
