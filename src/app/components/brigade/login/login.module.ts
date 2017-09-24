import { NgModule } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SweetAlertService } from '../../../services/sweet-alert.service';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [LoginComponent],
    exports: [LoginComponent],
    providers: [SweetAlertService]
})
export class LoginModule{
}