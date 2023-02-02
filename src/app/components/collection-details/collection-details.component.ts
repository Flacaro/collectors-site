import {
  Component,
  OnInit,
} from "@angular/core";
import {
  MatDialog,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable, of, switchMap } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { Collection } from "src/app/models/collection";
import { Disk } from "src/app/models/disk";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { DialogComponent } from "../diskAddDialog/dialog.component";

@Component({
  selector: "app-collection-details",
  templateUrl: "./collection-details.component.html",
  styleUrls: ["./collection-details.component.scss"],
})
export class CollectionDetailsComponent implements OnInit {


  disks$!: Observable<Disk[]>;
  collection$!: Observable<Collection>;
  isUserLogged!: boolean;
  privateOrPublic!: string;
  isPublic!: string;


  
  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private diskService: DiskService,
    private persistenceService: PersistenceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    const collectionId = this.route.snapshot.params["collectionId"];

    this.isPublic = this.route.snapshot.queryParamMap.get("isPublic") || "false";

    console.log(this.isPublic);

    if (this.isPublic === "true") {
      this.collection$ = this.collectionService.getPublicCollection(
        collectionId
      );
      this.disks$ = this.diskService.getDisksOfPublicCollection(collectionId);
      this.privateOrPublic = "/public";
      console.log(this.privateOrPublic);

    } else {
      this.collection$ = this.collectionService.getPrivateCollection(collectionId);
      this.disks$ = this.diskService.getDisksOfPrivateCollection(collectionId);
      this.privateOrPublic = "/private";
    }
    
    
    this.isUserLogged = !!this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);
  }



  openDialog() {
    const collectionId = this.route.snapshot.params["collectionId"];
  
    this.dialog
      .open(DialogComponent, {
        width: "500px",
      })
      .afterClosed()
      .pipe(
        filter((diskFormData) => !!diskFormData),
        switchMap((diskFormData) =>
          this.diskService.addDiskToCollection(collectionId, diskFormData)
        ),
        switchMap(() =>
          this.diskService.getDisksOfPrivateCollection(collectionId)
        )
      )
      .subscribe((result) => {
        this.disks$ = of(result);
      });
  }
 }
