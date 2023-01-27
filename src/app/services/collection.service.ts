import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient
  ) { }

  
  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/public/collections";
  

  getCollections(): Observable<Collection[]> {
    // debugger;
    return this.http.get<Collection[]>(this.API_URL_COLLECTIONS).pipe(
      tap((data) => console.log('Collections: ', JSON.stringify(data)))
    );
  }

  getCollection(id: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.API_URL_COLLECTIONS}/${id}`);
  }



}
