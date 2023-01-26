import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient
  ) { }

  getCollection() {
    return this.http.get(`${CONSTANTS.API_URL}/private/collections/:id`);
  }

  getCollections() {
    return this.http.get(`${CONSTANTS.API_URL}/private/collections`);
  }
  
}
