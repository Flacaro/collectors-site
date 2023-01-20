import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { CONSTANTS } from '../constants';
import { Observable } from 'rxjs';
import { Collection } from '../collection';

@Injectable({
  providedIn: 'root'
})
export class HomeServiceService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = CONSTANTS.IN_MEMORY_API_URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCollection(): Observable<Collection> {
    return this.http.get<Collection>(this.API_URL);
  }



}
