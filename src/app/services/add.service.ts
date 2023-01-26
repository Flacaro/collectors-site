import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Disk } from '../models/disk';

@Injectable({
  providedIn: 'root'
})
export class AddService {

  constructor(
    private http: HttpClient
  ) { }

  private API_URL_ADD_DISK = CONSTANTS.API_URL + "/private/collections/:id/disks";

addDisk(data: {
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
  return this.http.post<Disk>(this.API_URL_ADD_DISK, data);
}
}

 