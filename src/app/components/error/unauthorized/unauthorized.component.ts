import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'unauthorized',
  styleUrls: [ '../error.style.scss' ],
  templateUrl: './unauthorized.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'error-page app'
  },
})
export class UnauthorizedComponent {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  searchResult(): void {
    document.location.href = '/ps';
  }
}