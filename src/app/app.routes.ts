import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';


export const ROUTES: Routes = [{
   path: '', redirectTo: 'app', pathMatch: 'full'
  }, {
    path: 'app',   loadChildren: './components/layout/layout.module#LayoutModule' 
  }, {
    path: 'unauthorized',    component: UnauthorizedComponent
  }, {
    path: 'error', component: NotFoundComponent
  }, {
    path: '**',    component: NotFoundComponent
  }
];
