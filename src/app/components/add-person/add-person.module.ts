import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { AddPersonComponent } from './add-person.component';
import { PersonsService } from '../../services/persons.service';
import { PersonComponent } from './person/person.component';

export const routes = [
  { path: '', component: AddPersonComponent, pathMatch: 'full' },
  { path: ':id', component: PersonComponent, pathMatch: 'full' }
];

@NgModule({
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        ReactiveFormsModule
    ],
    declarations: [AddPersonComponent, PersonComponent],
    providers: [PersonsService]
})
export class AddPersonModule{
    static routes = routes;
}