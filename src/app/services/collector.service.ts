import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CONSTANTS } from '../constants';

@Injectable({
  providedIn: 'root'
})
export class CollectorService {


  constructor(
    private http: HttpClient
  ) { }

  getOwnerOfCollection(collectionId: number) {
    return this.http.get(`${CONSTANTS.API_URL}/public/collections/${collectionId}/owner`);
   

}

}
