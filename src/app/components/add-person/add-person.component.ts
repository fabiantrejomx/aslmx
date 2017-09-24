import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';
import { PersonsService } from '../../services/persons.service';
import { SweetAlertService } from '../../services/sweet-alert.service';

@Component({
    selector: 'add-person',
    templateUrl: './add-person.component.html'
})
export class AddPersonComponent implements OnInit{

    form: FormGroup;
    isSaving = false;

    constructor(
        private sweetAlertService: SweetAlertService,
        private personsService: PersonsService,
        private fb: FormBuilder
    ){
        this.form = fb.group({
            image: [''],
            email: [''],
            contacto: ['', Validators.required],
            fullname: ['', Validators.required],
            age: ['', Validators.compose([
                Validators.required, 
                Validators.minLength(1), 
                Validators.maxLength(3)
            ])]
        })
    }

    ngOnInit(){
        this.form.controls.age.valueChanges.subscribe(e => {
            if(e && e.toString().length > 3){
                this.form.controls.age.setErrors({'invalidNumber': true})
                this.form.controls.age.markAsTouched();
            }
        })
    }

    save(){
        this.isSaving = true;
        this.personsService.save(this.form.value)
            .finally(() => this.isSaving = false )
            .subscribe(response => {
                this.sweetAlertService.swal({
                    type: "success",
                    title: "<h4>¡Lo encontraremos!</h4>",
                    showConfirmButton: true,
                    confirmButtonText: 'OK',
                    allowOutsideClick: false
                }).then(() => this.form.reset())                
            })
    }

    imageFileSelected(event: any){
        let file : File = event.target.files[0];

        if(!file)
            return;

        if(!file.type.includes('image')){
            this.form.controls.image.setErrors({'type': true});
            return;
        }

        if(((file.size / 1024) / 1024) > 3){
            this.form.controls.image.setErrors({'size': true});
            return;
        }
            
        this.convertFileToBase64(file);
    }

    private convertFileToBase64(file: File){
        let reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            console.log(reader.result.length)
            this.form.controls.image.setValue(reader.result);
        }
    }
   
}