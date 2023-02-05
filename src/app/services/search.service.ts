import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../components/search-bar/search-bar.component';
import { CONSTANTS } from '../constants';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(search: Search): Observable<SearchResult> {
    return this.http.get<SearchResult>(`${CONSTANTS.API_URL}/public/search`, {
      params: {
        query: search.value
      }
    })
  }

}
