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



  constructor(
    private http: HttpClient
  ) { }

//   getOwnerOfCollection(collectionId: number) {
//     return this.http.get(`${CONSTANTS.API_URL}/public/collections/${collectionId}/owner`);

// }

  getCollectorsListInShared(collectionId: number): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/shareWith`);

  }

}
