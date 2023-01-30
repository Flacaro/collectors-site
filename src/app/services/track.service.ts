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

  private API_URL_TRACK = CONSTANTS.API_URL + "/public/collections/:collectionId/disks/:diskId/tracks";


  getTracksOfDisk(collectionId: number, diskId: number): Observable<Track []> {
    return this.http.get<Track []>(`${this.API_URL_TRACK}`.replace(":collectionId", collectionId.toString()).replace(":diskId", diskId.toString()));
  }
}