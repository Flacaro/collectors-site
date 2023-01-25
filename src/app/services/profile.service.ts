import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collector } from '../models/collector';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }


  getPersonalProfile(): Observable<Collector> {
    return this.http.get<Collector>(`${CONSTANTS.API_URL}/private/collectors/profile`);
  }

}
