import { Component, ViewEncapsulation } from '@angular/core';
import { TranslateService } from 'ng2-translate';

import { AppState } from './app.service';


@Component({
  selector: 'app-root',
  encapsulation: ViewEncapsulation.None,
  styleUrls: [
    './../assets/scss/application.scss'
  ],
  template: `<router-outlet></router-outlet>`
})
export class App {

  constructor(
    public appState: AppState,
    private translate: TranslateService) {
      translate.addLangs(["es", "en"]);
      translate.setDefaultLang("es");
      let browserLanguage = translate.getBrowserLang();
      translate.use(browserLanguage.match(/es|en/) ? browserLanguage : "es");
  }
}
