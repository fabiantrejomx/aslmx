import { Component, Output, EventEmitter } from '@angular/core';
import { PersonsService } from '../../../services/persons.service';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';


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
        }, error => this.error.emit())        
    }

}