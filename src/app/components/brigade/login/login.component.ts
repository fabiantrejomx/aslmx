import { Component, Output, EventEmitter } from '@angular/core';
import { PersonsService } from '../../../services/persons.service';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';
import { SweetAlertService } from '../../../services/sweet-alert.service';


@Component({
    selector: 'login',
    templateUrl: './login.component.html'
})
export class LoginComponent {

     form: FormGroup;
     @Output() success = new EventEmitter();
     @Output() error = new EventEmitter();
     isLoading: boolean;

    constructor(
        private sweetAlertService: SweetAlertService,
        private fb: FormBuilder,
        private personsService: PersonsService
    ){
        this.form = fb.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        })
    }

    login(){
        this.isLoading = true
        this.personsService.login(this.form.value).finally(() => this.isLoading = false).subscribe(response => {
            this.success.emit();
        }, error => {
            this.sweetAlertService.swal({
                type: "error",
                title: "<h5>¡Intentá de nuevo. Ocurrió un error</h5>",
                showConfirmButton: true,
                confirmButtonText: 'OK',
                allowOutsideClick: false
            }).then(() =>  this.error.emit())            
           })        
    }

}