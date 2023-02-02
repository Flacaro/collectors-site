import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';
import { Collector } from '../models/collector';
import { Disk } from '../models/disk';

@Injectable({
  providedIn: 'root'
})
export class CollectionService {

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }

  
  private API_URL_PUBLIC_COLLECTIONS = CONSTANTS.API_URL + "/public/collections";
  private API_URL_PRIVATE_COLLECTIONS = CONSTANTS.API_URL + "/private/collections";
  private API_URL_COLLECTOR_COLLECTIONSF = CONSTANTS.API_URL + "/private/collectors/favourites";


  getPublicCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.API_URL_PUBLIC_COLLECTIONS);
  }


  getPublicCollection(collectionId: number): Observable<Collection> {  
      return this.http.get<Collection>(`${this.API_URL_PUBLIC_COLLECTIONS}/${collectionId}`);
   
  }
  

  getPrivateCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(this.API_URL_PRIVATE_COLLECTIONS);
  }

  getPrivateCollection(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`);
  }

  getFavouriteCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTOR_COLLECTIONSF}`);
  }

  getOwnerOfCollection(collectionId: number): Observable<Collector> {
    return this.http.get<Collector>(`${this.API_URL_PUBLIC_COLLECTIONS}/${collectionId}/owner`);
  }

  addCollection(data: {
    name: string;
    type: string;
    visible: boolean;
  }): Observable<Collection> {
    return this.http.post<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}`, data);
  }




}
