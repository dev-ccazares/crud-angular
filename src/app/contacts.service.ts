import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';

@Injectable()
export class ProgramService {
    private apiUrl: string = environment.apiUrl;

    
}