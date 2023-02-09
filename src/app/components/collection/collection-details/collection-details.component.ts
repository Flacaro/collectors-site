import {
  Component,
  OnInit,
} from "@angular/core";
import {
  MatDialog,
} from "@angular/material/dialog";
import { ActivatedRoute } from "@angular/router";
import { filter, map, Observable, of, switchMap, window } from "rxjs";
import { Collection } from "src/app/models/collection";
import { Disk } from "src/app/models/disk";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { DialogComponent } from "../../disk/diskAddDialog/dialog.component";

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
  loggedCollector!: any;
  collectionById$!: Observable<Collection>;

  collectionId = this.route.snapshot.params["collectionId"];
  
  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private diskService: DiskService,
    private loggedCollectorService: LoggedCollectorService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {


    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();

    this.isPublic = this.route.snapshot.queryParamMap.get("isPublic") || "false";
    

    if (this.isPublic === "true") {
      this.collection$ = this.collectionService.getPublicCollection(
        this.collectionId
      );
      this.disks$ = this.diskService.getDisksOfPublicCollection(this.collectionId);
      this.privateOrPublic = "/public";
    

    } else {
      this.collection$ = this.collectionService.getPrivateCollection(this.collectionId);
      this.disks$ = this.diskService.getDisksOfPrivateCollection(this.collectionId);
      this.privateOrPublic = "/private";
    }

    
    
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
        .subscribe((result) => {this.disks$ = of(result);
      });
   
  }


  addCollectiontoFav() {
    const collectionId = this.route.snapshot.params["collectionId"];
    this.collectionService.addCollectionToFavourites(collectionId).subscribe();
    alert("This collection has been added to your favourites!");

  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collectionId).subscribe();
    alert("This collection has been deleted!");
    
  }

}


 