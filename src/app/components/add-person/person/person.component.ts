import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';
import { PersonsService } from '../../../services/persons.service';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@Component({
    selector: 'person',
    templateUrl: './person.component.html'
})
export class PersonComponent implements OnInit{

    form: FormGroup;
    person: any;
    isSaving: boolean;

    constructor(
        private sweetAlertService: SweetAlertService,
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
            this.sweetAlertService.swal({
                type: "success",
                title: "<h4>¡Muchas gracias!, avisameros.</h4>",
                showConfirmButton: true,
                confirmButtonText: 'OK',
                allowOutsideClick: false
            }).then(() => this.router.navigate(['app/dashboard']))
        }
        ,error => {
            this.sweetAlertService.swal({
                type: "error",
                title: "<h5>¡Intentá de nuevo. Ocurrio un error</h5>",
                showConfirmButton: true,
                confirmButtonText: 'OK'
            })
        })
    }

    goToBack(){
        this.router.navigate(['app/dashboard']);
    }
}