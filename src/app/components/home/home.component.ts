
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Collection } from "src/app/models/collection";
import { Collector } from "src/app/models/collector";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";
import { CollectorService } from "src/app/services/collector.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  header: string = "Welcome to the Collector's Hub";
  owner!: any;
  loggedCollector!: any | null;
  collections$!: Observable<Collection[]>;
  collections: Collection[] = [];
  collectionsNotMine: Collection[] = [];
  isOwner: boolean = false;


  constructor(
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService,
    private collectorService: CollectorService

    ) {}
  
     

  ngOnInit(): void {

    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();
    console.log(this.loggedCollector);

    this.collections$ = this.collectionService.getPublicCollections();
  
    this.collections$.subscribe((collections) => {
      this.collections = collections;
    });

    for (let collection of this.collections) {
      this.owner = this.collectorService.getOwnerOfCollection(collection.id);
      if (this.owner.id !== this.loggedCollector.id) {
        this.collections;
      } else {
        this.collectionsNotMine.push(collection);
      }
    
    }

    console.log(this.collectionsNotMine);

  



  }


}

