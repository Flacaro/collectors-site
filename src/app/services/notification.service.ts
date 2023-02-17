import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { CollectorNotification } from '../models/collector-notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private http: HttpClient) { }


  getNotifications(): Observable<CollectorNotification[]> {
    return this.http.get<CollectorNotification[]>(`${CONSTANTS.API_URL}/personal/notifications`)
  }


  deleteNotification(notificationId: number): Observable<any> {
    return this.http.delete(`${CONSTANTS.API_URL}/personal/notifications/${notificationId}`)
  }

}
