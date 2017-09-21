import {
  Component,
  ViewEncapsulation,
  ElementRef, Renderer,
  NgZone,
  ViewChild
} from '@angular/core';
import {
  Router,
  Event as RouterEvent,
  NavigationStart,
  NavigationEnd,
  NavigationCancel,
  NavigationError
} from '@angular/router';
import { AppConfig } from '../../app.config';
import { TranslateService } from 'ng2-translate';


@Component({
  selector: 'layout',
  encapsulation: ViewEncapsulation.None,
  templateUrl: './layout.template.html',
  host: {
    '[class.nav-static]' : 'config.state["nav-static"]',
    '[class.chat-sidebar-opened]' : 'chatOpened',
    '[class.app]' : 'true',
    id: 'app'
  }
})
export class Layout {
  config: any;
  configFn: any;
  $sidebar: any;
  el: ElementRef;
  router: Router;
  chatOpened: boolean = false;

  constructor(config: AppConfig,
              el: ElementRef,
              router: Router,
              private renderer: Renderer,
              private ngZone: NgZone,
              private translate: TranslateService) {
      translate.addLangs(["es", "en"]);
      translate.setDefaultLang("es");
      let browserLanguage = translate.getBrowserLang();
      translate.use(browserLanguage.match(/es|en/) ? browserLanguage : "es");
      this.el = el;
      this.config = config.getConfig();
      this.configFn = config;
      this.router = router;
  }

 
}
