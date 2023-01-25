import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { CONSTANTS } from '../constants';
import { Observable, throwError} from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { Collection } from '../models/collection';

@Injectable({
  providedIn: 'root'
})
export class HomeService{

  constructor(
    private http: HttpClient
  ) { }

  private API_URL = CONSTANTS.API_URL;

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  getCollections(): Observable<Array<Collection>> {
    return this.http.get<Array<Collection>>(this.API_URL + 'collections');
  }

  getCollectionsResponse(): Observable<HttpResponse<Array<Collection>>> {
    return this.http.get<Array<Collection>>(
     this.API_URL, { observe: 'response' });


  //httpClient.get() e' un metodo asincrono che manda una richiesta http
  //e ritorna un Observable che puo' essere sottoscritto per ricevere
  //il merodo get() prende due argomenti: l'url e le opzioni usate per configurare la richiesta
    }


}
