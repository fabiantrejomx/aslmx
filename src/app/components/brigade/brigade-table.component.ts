import { Component } from '@angular/core';
import { PersonsService } from '../../services/persons.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';


@Component({
    selector: 'brigade-table',
    templateUrl: './brigade-table.component.html'
})
export class BrigadeTableComponent {

    persons: any[];
    form: FormGroup;

    constructor(
        private fb: FormBuilder,
        private personsService: PersonsService
    ){
        this.personsService.getPersons().subscribe((persons: any) => this.persons = persons);

        this.form = fb.group({
            name: ['', Validators.required]
        });

        this.persons = [];

    }

    search(){
        if(this.form.value.name)
            this.personsService.searchPeople(this.form.value.name)
                .subscribe((persons: any) => this.persons = persons)
        else 
            this.personsService.getPersons().subscribe((persons: any) => this.persons = persons);
    }

}