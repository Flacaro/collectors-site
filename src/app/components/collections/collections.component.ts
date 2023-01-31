import { Component } from "@angular/core";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent {
  collections$ = this.collectionService.getPublicCollections();

  constructor(private collectionService: CollectionService) {}
}
