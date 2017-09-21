import { Component } from '@angular/core';
import { PersonsService } from '../../services/persons.service';


@Component({
    selector: 'brigade-table',
    templateUrl: './brigade-table.component.html'
})
export class BrigadeTableComponent {

    persons: any;

    constructor(
        private personsService: PersonsService
    ){
        this.personsService.getPersons().subscribe(persons => this.persons = persons);
    }

}