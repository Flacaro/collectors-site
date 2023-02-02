import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit{


  collections$ = this.collectionService.getPrivateCollections();


  constructor(private collectionService: CollectionService) {

  }

  ngOnInit(): void {

  }
}
