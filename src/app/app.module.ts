import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { Http, HttpModule, RequestOptions } from '@angular/http';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate';
import { Interceptor } from './configurations/http-interceptor';
import { ROUTES } from './app.routes';
import { App } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InteralStateType } from './app.service';
import { AppConfig } from './app.config';
import { NotFoundComponent } from './components/error/not-found/not-found.component';
import { UnauthorizedComponent } from './components/error/unauthorized/unauthorized.component';

const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState,
  AppConfig
];

type StoreType = {
  state: InteralStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

@NgModule({
  bootstrap: [ App ],
  declarations: [
    App,
    NotFoundComponent,
    UnauthorizedComponent
  ],
  imports: [ 
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES, { useHash: true }),
    TranslateModule.forRoot({
             provide: TranslateLoader,
             useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
             deps: [Http]
    })
  ],
  providers: [
    APP_PROVIDERS,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: Interceptor,
      multi: true
    },
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    this.appState._state = store.state;
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    const state = this.appState._state;
    store.state = state;
    store.disposeOldHosts = createNewHosts(cmpLocation);
    store.restoreInputValues  = createInputTransfer();
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

