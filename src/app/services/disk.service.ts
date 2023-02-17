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
  private API_URL_STATISTICS = CONSTANTS.API_URL + "/statistics";



  getDisksByPublicCollectionId(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks`);
  }

  getDisksByPersonalCollectionId(collectionId: number): Observable<Disk []> {
    return this.http.get<Disk []>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks`);
  }

  getDisksFromFavorites(collectorId: number): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${this.API_URL_PRIVATE}/collectors/${collectorId}/disks/favorites`);
  }
  
  getPersonalDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}`);
  }

  getDiskById(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.get<Disk>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}`);
  }
  addDiskToFav(collectorId:number, diskId: number): Observable<Disk> {
    return this.http.post<Disk>(`${this.API_URL_PRIVATE}/collectors/${collectorId}/disks/favorites`, {diskId: diskId});
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


  editPersonalDisk(collectionId: number, diskId: number, data: {
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
    return this.http.patch<Disk>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}`, data);
  }


  getDiskImages(collectionId: number, diskId: number): Observable<{imageId: number, base64Image: string}[]> {
    return this.http.get<{imageId: number, base64Image: string}[]>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}/images`);
  }


  addDiskImage(collectionId: number, diskId: number, file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}/images`, formData);
  }

  deleteDiskFromCollection(collectionId: number, diskId: number): Observable<Disk> {
    return this.http.delete<Disk>(`${this.API_URL_PRIVATE_COLLECTION}/${collectionId}/disks/${diskId}`);
  }


  getMostSearchedDisks(): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${this.API_URL_STATISTICS}/disks/most-searched`);
  }

}
