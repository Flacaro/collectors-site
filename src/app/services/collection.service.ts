import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';
import { CollectionPayload } from '../models/collection-payload';
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
  private API_URL_COLLECTIONTOFAV= CONSTANTS.API_URL + "/private/collectors/collections/favourites";
  private API_URL_PRIVATE_COLLECTION_SHARED = CONSTANTS.API_URL + "/private/collectors/collections/withMe";
    



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

  addCollectionToFavourites(collectionId: number): Observable<CollectionPayload> {
    return this.http.post<CollectionPayload>(`${this.API_URL_COLLECTIONTOFAV}`, {collectionId: collectionId});
  }

  addCollection(data: {
    name: string;
    type: string;
    visible: boolean;
  }): Observable<Collection> {
    return this.http.post<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}`, data);
  }

  getPublicCollectionsByParameters(name : string): Observable<Collection> {
    return this.http.get<Collection>(`${this.API_URL_PUBLIC_COLLECTIONS}`, {params: {name: name}});
  }

  deleteCollection(collectionId: number): Observable<Collection> {
    return this.http.delete<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`);
  }
  
  getCollectionSharedWithMe(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_PRIVATE_COLLECTION_SHARED}`);
  }



}
