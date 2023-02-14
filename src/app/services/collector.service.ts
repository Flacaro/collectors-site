import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Collector } from '../models/collector';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {

  private API_URL_PRIVATE_COLLECTIONS = CONSTANTS.API_URL + '/personal/collections';
  private API_URL_PRIVATE_COLLECTORS = CONSTANTS.API_URL + '/personal';



  constructor(
    private http: HttpClient
  ) { }

//   getOwnerOfCollection(collectionId: number) {
//     return this.http.get(`${CONSTANTS.API_URL}/public/collections/${collectionId}/owner`);

// }

  getCollectorsListInShared(collectionId: number): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/shareWith`);

  }

  editCollector(collectorId:number, collector: Collector): Observable<Collector> {
    return this.http.patch<Collector>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}`, collector);
  }

  getCollectorById(collectorId: number): Observable<Collector> {
    return this.http.get<Collector>(`${this.API_URL_PRIVATE_COLLECTORS}/collectors/${collectorId}`);
  }

}
