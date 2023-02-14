import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Search } from '../components/search-bar/search-bar.component';
import { CONSTANTS } from '../constants';
import { Disk } from '../models/disk';
import { SearchResult } from '../models/search-result';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  constructor(private http: HttpClient) { }

  search(search: Search): Observable<SearchResult> {
    let params: any = {
      query: search.value,
    };

    if(search.options) {
      params.includePrivateCollections = search.options.includePrivateCollections;
      params.includeSharedCollections = search.options.includeSharedCollections
    }

    return this.http.get<SearchResult>(`${CONSTANTS.API_URL}/search`, {
      params: params
    })
  }


  searchDisk(search: string): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${CONSTANTS.API_URL}/search/disks`, {
      params: {
        query: search
      }
    })
  }

}
