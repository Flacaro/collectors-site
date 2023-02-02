import { Component, OnInit } from "@angular/core";
import {
  combineLatest,
  map,
  Observable,
} from "rxjs";

import { Collection } from "src/app/models/collection";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  header: string = "Welcome to the Collector's Hub";
  collections$!: Observable<Collection[]>;
  collections: Collection[] = [];

  constructor(
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService
  ) {}

  ngOnInit(): void {
    this.collections$ = combineLatest([
      this.loggedCollectorService.getCurrentCollector(),
      this.collectionService.getPublicCollections(),
    ]).pipe(
      map(([loggedCollector, collections]) => {
        if (loggedCollector !== null) {
          const result = collections
            .filter((collection) => !!collection.ownerId)
            .filter((collection) => collection.ownerId !== loggedCollector.id);

          return result;
        }
        return collections;
      })
    );
  }
}
