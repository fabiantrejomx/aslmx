import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { BrigadeTableComponent } from './brigade-table.component';
import { CommonModule } from '@angular/common';
import { PersonsService } from '../../services/persons.service';
import { DetailsComponent } from './details.component';
import { LoginModule } from './login/login.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        SharedModule,
        CommonModule,
        LoginModule,
        ReactiveFormsModule
    ],
    declarations: [BrigadeTableComponent, DetailsComponent],
    exports: [BrigadeTableComponent],
    providers: [PersonsService]
})
export class BrigadeTableModule{
}