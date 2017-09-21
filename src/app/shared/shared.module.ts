import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateLoader, TranslateStaticLoader, TranslateService } from 'ng2-translate';

@NgModule({
    imports: [
      HttpModule,
      CommonModule,
      TranslateModule.forRoot({
             provide: TranslateLoader,
             useFactory: (http: Http) => new TranslateStaticLoader(http, 'assets/i18n', '.json'),
             deps: [Http]
    })
    ],
    exports: [
      CommonModule,
      TranslateModule
    ],
    providers: [TranslateService]
})
export class SharedModule {
     constructor(private translate: TranslateService) {
        translate.addLangs(["es", "en"]);
        translate.setDefaultLang("es");
        let browserLanguage = translate.getBrowserLang();
        translate.use(browserLanguage.match(/es|en/) ? browserLanguage : "es");
    }
}
