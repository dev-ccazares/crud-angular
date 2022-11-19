import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ContactsService {
    private apiUrl: string = environment.apiUrl;
    constructor(private http: HttpClient) {}

    createContact(u: any) {
        return this.http
            .post(`${this.apiUrl}/person`, u);
    }

    updateContact(u: any) {
        return this.http
            .put(`${this.apiUrl}/person`, u);
    }

    getContact() {
        return this.http
            .get(`${this.apiUrl}/person/all`);
    }

    deleteContact(u: any) {
        return this.http
            .delete(`${this.apiUrl}/person/${u}`);
    }
}