import {
  Component,
  Inject,
  OnInit,
  TemplateRef,
  ViewChild,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { filter, Observable, of } from "rxjs";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";
import { DialogComponent } from "../dialog/dialog.component";

@Component({
  selector: "app-collection-details",
  templateUrl: "./collection-details.component.html",
  styleUrls: ["./collection-details.component.scss"],
})
export class CollectionDetailsComponent implements OnInit {

  collection$!: Observable<Collection>;


  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const collectionId = this.route.snapshot.params["id"];

    this.collection$ = this.collectionService.getCollection(collectionId);
  }


  openDialog() {
    this.dialog.open(DialogComponent, {
      width: "500px",
    }).afterClosed().pipe(
      filter(result => !!result)
    ).subscribe(result => {
      console.log(result);
    });
  }
}
