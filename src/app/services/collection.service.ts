import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, tap } from "rxjs";
import { CONSTANTS } from "../constants";
import { Collection } from "../models/collection";
import { CollectionPayload } from "../models/collection-payload";
import { CollectorPayload } from "../models/collector-payload";
import { Collector } from "../models/collector";
import { Disk } from "../models/disk";
import { PageableResponse } from "../models/pageable-response";

@Injectable({
  providedIn: "root",
})
export class CollectionService {
  constructor(private http: HttpClient, private route: ActivatedRoute) {}

  private API_URL_COLLECTIONS = CONSTANTS.API_URL + "/collections";
  private API_URL_PRIVATE_COLLECTIONS =
    CONSTANTS.API_URL + "/personal/collections";
  private API_URL_COLLECTIONTOFAV =
    CONSTANTS.API_URL + "/personal/collections/favorites";

  getCollectorsNotInCollection(
    collectionId: number,
    pageSize: number,
    page: number
  ): Observable<PageableResponse<Collector>> {
    return this.http.get<PageableResponse<Collector>>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/collectors-not-in`,
      {
        params: {
          size: pageSize.toString(),
          page: page.toString(),
        },
      }
    );
  }

  getPersonalCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_PRIVATE_COLLECTIONS}`);
  }

  getPersonalCollectionById(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`
    );
  }

  getPublicCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTIONS}`);
  }

  getPublicCollectionById(collectionId: number): Observable<Collection> {
    return this.http.get<Collection>(
      `${this.API_URL_COLLECTIONS}/${collectionId}`
    );
  }

  addCollectionToFavorites(
    collectionId: number
  ): Observable<CollectionPayload> {
    return this.http.post<CollectionPayload>(
      `${this.API_URL_COLLECTIONTOFAV}`,
      { collectionId: collectionId }
    );
  }

  getOwnerOfACollection(collectionId: number): Observable<Collector> {
    return this.http.get<Collector>(
      `${this.API_URL_COLLECTIONS}/${collectionId}/owner`
    );
  }

  addCollection(data: {
    name: string;
    type: string;
    visible: boolean;
  }): Observable<Collection> {
    return this.http.post<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}`,
      data
    );
  }

  deleteCollection(collectionId: number): Observable<Collection> {
    return this.http.delete<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`
    );
  }

  getFavoriteCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTIONTOFAV}`);
  }

  unshareCollection(
    collectorsIds: number[],
    collectionId: number
  ): Observable<Collection> {
    return this.http.delete<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/collectors`,
      { body: { collectorsIds: collectorsIds } }
    );
  }

  editCollection(
    collectionId: number,
    data: {
      name: string;
      type: string;
      visible: boolean;
    }
  ): Observable<Collection> {
    return this.http.patch<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}`,
      data
    );
  }

  getAllCollections(): Observable<Collection[]> {
    return this.http.get<Collection[]>(`${this.API_URL_COLLECTIONS}`);
  }

  shareCollection(
    collectorsIds: number[],
    collectionId: number
  ): Observable<Collection> {
    return this.http.post<Collection>(
      `${this.API_URL_PRIVATE_COLLECTIONS}/${collectionId}/collectors`,
      collectorsIds
    );
  }

  deleteCollectionFromFav(collectionId: number): Observable<Collection> {
    return this.http.delete<Collection>(
      `${this.API_URL_COLLECTIONTOFAV}/${collectionId}`
    );
  }

}
