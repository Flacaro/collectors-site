import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { Observable } from "rxjs";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit{

  collections$!: Observable<Collection[]>;


  constructor(private collectionService: CollectionService) {

  }

  ngOnInit(): void {

    this.collections$ = this.collectionService.getPrivateCollections();

  }
}
