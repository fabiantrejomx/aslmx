import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PersonsService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = '/sismo-api'
    }

    save(person: any){
        return this.http.post(this.url + '/users/families', person);
    }

    getPersons() {
        return this.http.get(this.url + '/users/families')
    }

    getPersonById(id: number){
        return this.http.get(this.url + '/users/families/familiar/' + id);
    }

    login(user: any){
        return this.http.post(this.url + '/users/login', user);
    }

    sendAlert(body: any){
        return this.http.post(this.url + '/users/info', body);
    }

    searchPeople(name: string){
        let params = new HttpParams();
        params = params.append('name', name);

        return this.http.get(this.url + '/users/families/familiar/found', { params })
    }

}