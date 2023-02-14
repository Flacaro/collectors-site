import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';
import { CollectionPayload } from '../models/collection-payload';
import { CollectorPayload } from '../models/collector-payload';
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

  
  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/collections";
  private API_URL_PRIVATE_COLLECTIONS = CONSTANTS.API_URL + "/personal/collections";
  private API_URL_COLLECTIONTOFAV= CONSTANTS.API_URL + "/personal/collections/favorites";
  private API_URL_PRIVATE_COLLECTION_SHARED = CONSTANTS.API_URL + "/personal/collections/sharedWithMe";
    

  getPersonalCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_PRIVATE_COLLECTIONS}`);
  }

  getPersonalCollectionById(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`);
  }

 getPublicCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTIONS}`);
 }

 getPublicCollectionById(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(`${this.API_URL_COLLECTIONS}/${collectionId}`);
  }

  addCollectionToFavorites(collectionId: number): Observable<CollectionPayload> {
    return this.http.post<CollectionPayload>(`${this.API_URL_COLLECTIONTOFAV}`, {collectionId: collectionId});
  }

  getOwnerOfACollection(collectionId: number): Observable<Collector> {
    return this.http.get<Collector>(`${this.API_URL_COLLECTIONS}/${collectionId}/owner`);
  }

  addCollection(data: {
    name: string;
    type: string;
    visible: boolean;
  }): Observable<Collection> {
    return this.http.post<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}`, data);
  }


  deleteCollection(collectionId: number): Observable<Collection> {
    return this.http.delete<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`);
  }
  
  getCollectionSharedWithMe(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_PRIVATE_COLLECTION_SHARED}`);
  }

  getFavoriteCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTIONTOFAV}`);
  }

  unshareCollection(collectorsIds: number[], collectionId: number): void {
     this.http.post(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/unshareWith`, collectorsIds);
  }

  editCollection(collectionId: number, data: {
    name: string;
    type: string;
    visible: boolean;
  }): Observable<Collection> {
    return this.http.patch<Collection>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`, data);
  }
  


}
