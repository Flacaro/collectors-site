import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";
import { HomeService } from "src/app/services/home.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {

  header: string = "Welcome to the Collector's Hub";
  collections: Collection[] = [];

  constructor(
    private homeService: HomeService,
    private collectionService: CollectionService) {}
  
     

  ngOnInit(): void {
    this.collectionService.getCollections().subscribe({
      next: collections => {
        this.collections = collections;
      }

    });


  }





}


  


