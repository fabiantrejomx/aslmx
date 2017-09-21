import { Component, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'not-found',
  styleUrls: [ '../error.style.scss' ],
  templateUrl: './not-found.component.html',
  encapsulation: ViewEncapsulation.None,
  host: {
    class: 'error-page app'
  },
})
export class NotFoundComponent {
  router: Router;

  constructor(router: Router) {
    this.router = router;
  }

  searchResult(): void {
    this.router.navigate(['/app']);
  }
}
