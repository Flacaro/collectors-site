import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Disk } from '../models/disk';
import { CollectionService } from './collection.service';

@Injectable({
  providedIn: 'root'
})
export class DiskServiceService {

  constructor(
    private http: HttpClient,
    private collectionService: CollectionService
  ) { }

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/public/collections";

  getDisksOfCollection(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks`).pipe(
      tap((data) => console.log('Disks: ', JSON.stringify(data)))
    );
  }

  getDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}`).pipe(
      tap((data) => console.log('Disk: ', JSON.stringify(data)))
    );
  }
  
}
