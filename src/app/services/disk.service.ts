import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Disk } from '../models/disk';
import { CollectionService } from './collection.service';

@Injectable({
  providedIn: 'root'
})
export class DiskService {

  constructor(
    private http: HttpClient,
    private collectionService: CollectionService
  ) { }

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/public/collections";
  private API_URL_DISKSF = CONSTANTS.API_URL + "/public/collectors/disks/favourites";

  getDisksOfCollection(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks`);
  }

  getDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}`);
  }

  getDiskFromFavorites(): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${this.API_URL_DISKSF}`);
  }

}
