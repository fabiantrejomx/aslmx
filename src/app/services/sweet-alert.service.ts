import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

@Injectable()
export class SweetAlertService{

    swal(options: any){
        return swal(options);
    }
}