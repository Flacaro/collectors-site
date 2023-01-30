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
import { CONSTANTS } from "src/app/constants";
import { Collection } from "src/app/models/collection";
import { Disk } from "src/app/models/disk";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";
import { DialogComponent } from "../diskAddDialog/dialog.component";

@Component({
  selector: "app-collection-details",
  templateUrl: "./collection-details.component.html",
  styleUrls: ["./collection-details.component.scss"],
})
export class CollectionDetailsComponent implements OnInit {

  collection$!: Observable<Collection>;
  disks$!: Observable<Disk[]>;
  collectionId!: number;
  isUserLogged!: boolean;


  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private diskService: DiskService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.collectionId = this.route.snapshot.params["collectionId"];

    this.collection$ = this.collectionService.getCollection(this.collectionId);

    this.disks$ = this.diskService.getDisksOfCollection(this.collectionId);
    
    this.isUserLogged = !!localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);


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
