import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Observable } from "rxjs/internal/Observable";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";
import { HomeService } from "src/app/services/home.service";
import { LoggedCollectorService } from "src/app/services/logged-collector.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  headers!: string[];

  constructor(
    private homeService: HomeService,
    private collectionService: CollectionService) {}
  
collection!: Collection;
collections!: Collection[];



  ngOnInit(): void {

  }

  getCollectionId(id: number): void{
    this.collectionService.getCollection(id).subscribe((data) => {
      this.collection = data;
      console.log(this.collection);
    }
    );
  }

  getCollections(): void{
    this.collectionService.getCollections().subscribe((data) => {
      this.collections = data;
      console.log(this.collections);
    }
    );
  }



}


  


