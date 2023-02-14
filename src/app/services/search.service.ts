import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { Search } from '../components/search-bar/search-bar.component';
import { CONSTANTS } from '../constants';
import { Collection } from '../models/collection';
import { Collector } from '../models/collector';
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
    }

   if(search.options) {
      params.includePrivateCollections = search.options.includePrivateCollections;
      params.includeSharedCollections = search.options.includeSharedCollections
    }

    return combineLatest([
      this.searchCollections(search.value),
      this.searchCollectors(search.value),
      this.searchDisk(search.value)
    ]).pipe(
      map(([collections, collectors, disks]) => {
        return {
          collections,
          collectors,
          disks
        }
      }
    ))
  }


 searchCollections(search: string): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${CONSTANTS.API_URL}/search/collections`, {
      params: {
        query: search
 
      }
    })
  }

  searchCollectors(search: string): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${CONSTANTS.API_URL}/search/collectors`, {
      params: {
        query: search
      }
    })
  }


  searchDisk(search: string): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${CONSTANTS.API_URL}/search/disks`, {
      params: {
        query: search,
      }
    })
  }

 

  //   return this.http.get<SearchResult>(`${CONSTANTS.API_URL}/search/collections`, {
  //     params: params
  //   })
  // }

 


}
