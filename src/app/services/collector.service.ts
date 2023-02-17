import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';
import { Collector } from '../models/collector';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  private API_URL_PRIVATE_COLLECTIONS = CONSTANTS.API_URL + '/personal/collections';
  private API_URL_PRIVATE_COLLECTORS = CONSTANTS.API_URL + '/personal';
  private API_COLLECTORS = CONSTANTS.API_URL + '/collectors';



  constructor(
    private http: HttpClient
  ) { }

//   getOwnerOfCollection(collectionId: number) {
//     return this.http.get(`${CONSTANTS.API_URL}/public/collections/${collectionId}/owner`);

// }

  getCollectorsListInShared(collectionId: number): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/collectors`);

  }

  editCollector(collectorId:number, collector: Collector): Observable<Collector> {
    return this.http.patch<Collector>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}`, collector);
  }

  getCollectorById(collectorId: number): Observable<Collector> {
    return this.http.get<Collector>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}`);
  }

  getCollectorsThatShareTheCollection(collectionId: number): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/collectors`);
  }

  getAllCollectors(): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${this.API_COLLECTORS}`);
  }

  getPersonalImages(): Observable<Blob> {
    return this.http.get(`${this.API_URL_PRIVATE_COLLECTORS}/profile/images`, {
      observe: 'body',
      responseType: 'blob'
    }).pipe(
      map(resp => new Blob([resp], { type: 'image/jpeg' }))
    )
  }

  addCollectorImage(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post(`${this.API_URL_PRIVATE_COLLECTORS}/profile/images`, formData);
  }
  
  getCollectionSharedWithMe(collectorId: number): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}/collections`);
  }

  deleteCollectionFromSharedList(collectorId: number, collectionId: number): Observable<Collection> {
    return this.http.delete<Collection>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}/collections/${collectionId}`);
  }

}
