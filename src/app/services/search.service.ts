import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { combineLatest, forkJoin, map, Observable, switchMap } from "rxjs";
import { Search } from "../components/search-bar/search-bar.component";
import { CONSTANTS } from "../constants";
import { Collection } from "../models/collection";
import { Collector } from "../models/collector";
import { Disk } from "../models/disk";
import { PageableResponse } from "../models/pageable-response";
import { SearchResult } from "../models/search-result";

@Injectable({
  providedIn: "root",
})
export class SearchService {

  private API_COLLECTORS = CONSTANTS.API_URL + '/collectors';


  constructor(private http: HttpClient) {}


  searchForLoggedCollector(search: Search): Observable<SearchResult> {
    let params: any = {
      query: search.value,
    };

    if (search.options) {
      params.includePrivateCollections =
        search.options.includePrivateCollections;
      params.includeSharedCollections = search.options.includeSharedCollections;
    }

    return combineLatest([
      this.searchCollectionsForLoggedCollector(params),
      this.searchCollectorsWhenYouAreLogged(search.value, params),
      this.searchDisk(search.value,params),
    ]).pipe(
      map(([collections, collectors, disks]) => {
        return {
          collections,
          collectors,
          disks,
        };
      })
    );
  }


  search(search: Search): Observable<SearchResult> {
    let params: any = {
      query: search.value,
    };

    if (search.options) {
      params.includePrivateCollections =
        search.options.includePrivateCollections;
      params.includeSharedCollections = search.options.includeSharedCollections;
    }

    return combineLatest([
      this.searchCollections(search.value),
      this.searchCollectors(search.value, params),
      this.searchDisk(search.value, params),
    ]).pipe(
      map(([collections, collectors, disks]) => {
        return {
          collections,
          collectors,
          disks,
        };
      })
    );
  }

  searchCollections(search: string, params: Search['options'] = {includePrivateCollections: false, includeSharedCollections: false}): Observable<Collection[]> {
    return this.http.get<Collection[]>(
      `${CONSTANTS.API_URL}/search/collections`,
      {
        params: {
          query: search,
          ...params
        },
      }
    );
  }

  searchCollectionsForLoggedCollector(searchParams: any): Observable<Collection[]> {
    return this.http.get<Collection[]>(
      `${CONSTANTS.API_URL}/personal/collections/search`,
      {
        params: searchParams,
      }
    );
  }

  searchCollectors(search: string, params: Search['options'] = {includePrivateCollections: false, includeSharedCollections: false}): Observable<Collector[]> {
    return this.http.get<Collector[]>(
      `${CONSTANTS.API_URL}/search/collectors`,
      {
        params: {
          query: search,
          ...params
        },
      }
    );
  }

  
  searchCollectorsWhenYouAreLogged(search: string, params: Search['options'] = {includePrivateCollections: false, includeSharedCollections: false}): Observable<Collector[]> {
    return this.http.get<Collector[]>(`${CONSTANTS.API_URL}/personal/collectors/search`,
      {
        params: {
          query: search,
          ...params
        },
      }
    );
  }


  
  searchDisk(search: string, params: Search['options'] = {includePrivateCollections: false, includeSharedCollections: false}): Observable<Disk[]> {
    return this.http.get<Disk[]>(`${CONSTANTS.API_URL}/search/disks`, {
      params: {
        query: search,
        ...params
      },
    });
  }


  searchCollectorsNotInCollection(
    search: string,
    collectionId: number,
    pageSize: number,
    page: number
  ): Observable<PageableResponse<Collector>> {
    return this.http.get<PageableResponse<Collector>>(
      `${CONSTANTS.API_URL}/search/collections/${collectionId}/collectors/not-in`,
      {
        params: {
          query: search,
          size: pageSize.toString(),
          page: page.toString(),
        },
      }
    );
  }
}
