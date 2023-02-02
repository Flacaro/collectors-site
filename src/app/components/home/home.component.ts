
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs";

import { Collection } from "src/app/models/collection";
import { Collector } from "src/app/models/collector";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  header: string = "Welcome to the Collector's Hub";
  collections: Collection[] = [];
  publicCollections: Collection[] = [];
  owner!: Collector;
  loggedCollector!: any;
  collections$!: Observable<Collection[]>;


  constructor(
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService
    ) {}
  
     

  ngOnInit(): void {

    this.loggedCollectorService.getCurrentCollector().subscribe((collector) => {
      this.loggedCollector = collector;
    });

    this.collections$ = this.collectionService.getPublicCollections();
    // this.collections$.subscribe((collections) => {
    //   this.collections = collections;
    // });


  //   if(this.loggedCollector === null) {
  //      this.collections$.subscribe((collections) => {
  //         this.publicCollections = collections;
  //   });
  //   } else {
  //     for (let collection of this.collections) {
  //       this.collectionService.getOwnerOfCollection(collection.id).subscribe((owner) => {
  //         this.owner = owner;
  //       });
  //       if (this.loggedCollector.id != this.owner.id) {
  //         this.publicCollections.push(collection);
  //       }
  //     }
     
  // }


  }
  





}


  


