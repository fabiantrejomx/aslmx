import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';
import { PersonsService } from '../../../services/persons.service';

@Component({
    selector: 'person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit{

    form: FormGroup;
    person: any;
    isSaving: boolean;

    constructor(
        private router: Router,
        private activatedRoute: ActivatedRoute,
        private personsService: PersonsService,
        private fb: FormBuilder
    ){
        this.form = fb.group({
            body: ['', Validators.required]
        })
    } 

    ngOnInit(){
        this.personsService.getPersonById(this.activatedRoute.snapshot.params.id).subscribe(response => this.person = response)
    } 

    sendAlert(){
        this.isSaving = true;
        let body: any = {};
        body.to = this.person.email;
        body.body = this.form.value.body;
        body.subject = this.person.contacto;

        this.personsService.sendAlert(body)
        .finally(() => this.isSaving = false)
        .subscribe(response => {
            this.router.navigate(['app/dashboard']);
        }
        ,error => console.log(error))
    }
}