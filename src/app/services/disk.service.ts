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

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/collections";
  private API_URL_PRIVATE_COLLECTION = CONSTANTS.API_URL + "/personal/collections";
  private API_URL_PRIVATE = CONSTANTS.API_URL + "/personal";



  getDisksByPublicCollectionId(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks`);
  }

  getDisksByPersonalCollectionId(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks`);
  }

  getDisksFromFavorites(): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${this.API_URL_PRIVATE}/disks/favorites`);
  }
  
  getPersonalDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}`);
  }

  getDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}`);
  }
  addDiskToFav(diskId: number): Observable<Disk> {
    return this.http.post<Disk>(`${this.API_URL_PRIVATE}/disks/favorites`, {diskId: diskId});
  }


  addDiskToCollection(collectionId: number, data: {
    title: string;
    artist: string;
    year: number;
    genre: string;
    author: string;
    label: string;
    band: string;
    state: string;
    duplicate: number;
    format: string;
    barcode: number;
  }): Observable<Disk> {
    return this.http.post<Disk>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks`, data);
  }

  // getMostSearchedDisks(): Observable<Disk[]> {
  //   return this.http.get<Disk[]>(`${this.API_URL_PUBLIC_COLLECTIONS}/statistics`);
  // }

}
