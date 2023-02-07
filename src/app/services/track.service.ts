import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Track } from '../models/track';
import {Disk} from "../models/disk";

@Injectable({
  providedIn: 'root'
})
export class TrackService {

  constructor(
    private http: HttpClient,

  ) { }

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/public/collections";
  private API_URL_TRACK = CONSTANTS.API_URL + "/public/collections/:collectionId/disks/:diskId/tracks";
  private API_URL_PRIVATE_TRACKS = CONSTANTS.API_URL + "/private/collections/:collectionId/disks/:diskId/tracks";
  private API_URL_PRIVATE_TRACK = CONSTANTS.API_URL + "/private/collections/:collectionId/disks/:diskId/tracks/:trackId";


  getPublicTracksOfDisk(collectionId: number, diskId: number): Observable<Track []> {
    return this.http.get<Track []>(`${this.API_URL_TRACK}`.replace(":collectionId", collectionId.toString()).replace(":diskId", diskId.toString()));
  }

  getPublicTrackById(collectionId: number, diskId: number, trackId: number): Observable<Track> {
    return this.http.get<Track>(`${this.API_URL_COLLECTIONS}/${collectionId}/disks/${diskId}/tracks/${trackId}`);
  }

  getPrivateTracksOfDisk(collectionId: number, diskId: number): Observable<Track []> {
    return this.http.get<Track []>(`${this.API_URL_PRIVATE_TRACKS}`.replace(":collectionId", collectionId.toString()).replace(":diskId", diskId.toString()));
  }

  getPrivateTrackById(collectionId: number, diskId: number, trackId: number): Observable<Track> {
    return this.http.get<Track>(`${this.API_URL_PRIVATE_TRACK}`.replace(":collectionId", collectionId.toString()).replace(":diskId", diskId.toString()).replace(":trackId", trackId.toString()));
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
    return this.http.post<Track>(`${this.API_URL_PRIVATE_TRACKS}`.replace(":collectionId", collectionId.toString()).replace(":diskId", diskId.toString()),data);
  }



}
