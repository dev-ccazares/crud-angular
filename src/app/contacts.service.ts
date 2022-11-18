import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ContactsService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    createContact(u: any) {
        return this.http
            .post(`${this.apiUrl}/person`, u)
            .toPromise();
    }

    getContact() {
        return this.http
            .get(`${this.apiUrl}/person/all`)
            .toPromise();
    }
}