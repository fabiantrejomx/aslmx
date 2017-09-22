import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators} from  '@angular/forms';
import { PersonsService } from '../../services/persons.service';

@Component({
    selector: 'add-person',
    templateUrl: './add-person.component.html'
})
export class AddPersonComponent {

    form: FormGroup;
    isSaving = false;

    constructor(
        private personsService: PersonsService,
        private fb: FormBuilder
    ){
        this.form = fb.group({
            image: [''],
            email: ['', Validators.required],
            contacto: ['', Validators.required],
            fullname: ['', Validators.required],
            age: ['']
        })
    }

    save(){
        this.isSaving = true;
        this.personsService.save(this.form.value)
            .finally(() => this.isSaving = false )
            .subscribe(response => {
                this.form.reset();
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