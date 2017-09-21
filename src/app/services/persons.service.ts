import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class PersonsService {
    url: string;

    constructor(private http: HttpClient) {
        this.url = '/users'
    }

    save(person: any){
        return this.http.post(this.url + '/families', person);
    }

    getPersons() {
        return this.http.get(this.url + '/families')
    }

    getPersonById(id: number){
        return this.http.get(this.url + '/families/familiar/' + id);
    }

    login(user: any){
        return this.http.post(this.url + '/login', user);
    }

    sendAlert(body: any){
        return this.http.post(this.url + '/info', body);
    }

    searchPeople(name: string){
        let params = new HttpParams();
        params = params.append('name', name);

        return this.http.get(this.url + '/families/familiar/found', { params })
    }

}