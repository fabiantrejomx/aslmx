import { Component, ViewEncapsulation } from '@angular/core';
import { AppConfig } from '../../app.config';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.template.html',
  encapsulation: ViewEncapsulation.None
})
export class Dashboard {

  constructor(config: AppConfig) {
  }

}
