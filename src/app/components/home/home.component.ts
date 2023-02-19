import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  Subject,
  switchMap,
} from "rxjs";

import { Collection } from "src/app/models/collection";
import { Collector } from "src/app/models/collector";
import { Disk } from "src/app/models/disk";
import { SearchResult } from "src/app/models/search-result";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";
import { SearchService } from "src/app/services/search.service";
import { Search } from "../search-bar/search-bar.component";

type ShuffledSearchResult = Array<Collection | Disk | Collector>;

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  header: string = "Welcome to the Collector's Hub";

  private publicCollections$!: Observable<Collection[]>;
  private search$ = new Subject<Search>();

  isCollectorLogged$: Observable<boolean> = this.loggedCollectorService
    .getCurrentCollector()
    .pipe(map((collector) => collector !== null));

  results$!: Observable<ShuffledSearchResult | Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService,
    private searchService: SearchService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.publicCollections$ = this.collectionService.getPublicCollections();

    this.results$ = combineLatest([this.publicCollections$, this.search$]).pipe(
      switchMap(([publicCollections, search]) => {
        if (search.value === "") {
          return of(publicCollections);
        } else {
          return this.searchService
            .search(search)
            .pipe(map((results) => this.shuffleSearchResults(results)));
        }
      })
    );
  }

  onValueChanges(searchValue: Search) {
    this.search$.next(searchValue);
  }

  shuffleSearchResults(result: SearchResult): ShuffledSearchResult {
    const { collections, collectors, disks } = result;
    let m = collections.length,
      t,
      i;

    while (m) {
      i = Math.floor(Math.random() * m--);

      t = collections[m];
      collections[m] = collections[i];
      collections[i] = t;

      t = collectors[m];
      collectors[m] = collectors[i];
      collectors[i] = t;

      t = disks[m];
      disks[m] = disks[i];
      disks[i] = t;
    }

    return [...collections, ...collectors, ...disks];
  }

  // type guard -> https://www.typescriptlang.org/docs/handbook/advanced-types.html#type-guards-and-differentiating-types

  isCollection(item: ShuffledSearchResult[number]): item is Collection {
    if (item) {
      return "type" in item;
    }
    return false;
  }

  isCollector(item: ShuffledSearchResult[number]): item is Collector {
    if (item) {
      return "email" in item;
    }
    return false;
  }

  isDisk(item: ShuffledSearchResult[number]): item is Disk {
    if (item) {
      return "title" in item;
    }
    return false;
  }

  getCollectorImageOrDefault(collector: Collector): string {
    if (collector.images) {
    }
    return "assets/img/default_avatar.jpg";
  }
}
