import  { Component, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
    selector: '[details]',
    templateUrl: './details.component.html'
})
export class DetailsComponent {

    @Input() person: any;

    constructor(
        private activatedRoute: ActivatedRoute,
        private router:Router){}

    goToDetails(){
        this.router.navigate(['app/person', this.person.id])
    }
}