
import { Component, Input, OnInit } from "@angular/core";

import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  header: string = "Welcome to the Collector's Hub";
  collections: Collection[] = [];

  constructor(
    private collectionService: CollectionService) {}
  
     

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe({
      next: collections => {
        this.collections = collections;
      }

    });


  }





}


  


