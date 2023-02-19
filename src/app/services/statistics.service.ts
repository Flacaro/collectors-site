import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CONSTANTS } from '../constants';
import { Statistics } from '../models/statistics';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  constructor(private http: HttpClient) { }


  getPublicStatistics(): Observable<Statistics.Statistics> {
    return this.http.get<Statistics.Statistics>(`${CONSTANTS.API_URL}/statistics`)
  }

  getPersonalStatistics(): Observable<Statistics.Statistics> {
    return this.http.get<Statistics.Statistics>(`${CONSTANTS.API_URL}/personal/statistics`)
  }

}
