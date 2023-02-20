import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Track } from '../models/track';


@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient,

  ) { }

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/collections";
  private API_PRIVATE_URL_COLLECTIONS = CONSTANTS.API_URL + "/personal/collections";

  getTracksOfDisk(collectionId: number, diskId: number): Observable<Track []> {
    return this.http.get<Track []>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks`);
  }

  getTrackById(collectionId: number, diskId: number, trackId: number): Observable<Track> {
    return this.http.get<Track>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks/${trackId}`);
  }

  getPersonalTracksOfDisk(collectionId: number, diskId: number): Observable<Track []> {
    return this.http.get<Track []>(`${this.API_PRIVATE_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks`);
  }

  getPersonalTrackById(collectionId: number, diskId: number, trackId: number): Observable<Track> {
    return this.http.get<Track>(`${this.API_PRIVATE_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks/${trackId}`);
  }

  addTrackToDisk(collectionId, diskId, data:{
    id: number;
    title: string;
    band: string;
    album: string;
    artist: string;
    compositor: string;
    time : number;
  }): Observable<Track>{
  
    return this.http.post<Track>(`${this.API_PRIVATE_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks`,data);
  }

  editTrack(collectionId: number, diskId: number, trackId: number, data: {
    title: string;
    author: string;
    album: string;
    band: string;
    artist: string;
    time : number;
  }): Observable<Track> {
    return this.http.patch<Track>(`${this.API_PRIVATE_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks/${trackId}`, data);
  }


  deleteTrack(collectionId: number, diskId: number, trackId: number): Observable<Track> {
    return this.http.delete<Track>(`${this.API_PRIVATE_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks/${trackId}`);
  }



}
