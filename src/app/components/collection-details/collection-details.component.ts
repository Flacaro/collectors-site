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
import { filter, map, Observable, of, switchMap } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { Collection } from "src/app/models/collection";
import { Collector } from "src/app/models/collector";
import { Disk } from "src/app/models/disk";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
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
  collection$!: Observable<Collection>;
  disks$!: Observable<Disk[]>;
  collectionId!: number;
  isUserLogged!: boolean;
  collection!: Collection;
  privateOrPublic!: string;
  currentCollector: Collector | null = null;
  ownerOfCollection!: boolean;

  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private diskService: DiskService,
    private route: ActivatedRoute,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params["collectionId"];
    this.collection$ = this.collectionService.getPublicCollection(this.collectionId);
    if (this.collection$ !== null) {
      this.privateOrPublic = "/public";
    } else {
      this.privateOrPublic = "/private";
      this.collection$ = this.collectionService.getPrivateCollection(this.collectionId);
    }

    // this.collection$ = this.collectionService.getCollection(this.collectionId);
    // this.collection$ = this.collectionService.getPrivateCollection(this.collectionId);

    this.disks$ = this.diskService.getDisksOfCollection(this.collectionId);

    this.isUserLogged = !!this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: "500px",
      })
      .afterClosed()
      .pipe(
        filter((diskFormData) => !!diskFormData),
        switchMap((diskFormData) =>
          this.diskService.addDiskToCollection(this.collectionId, diskFormData)
        ),
        switchMap(() =>
          this.diskService.getDisksOfCollection(this.collectionId)
        )
      )
      .subscribe((result) => {
        debugger;
      });
  }
}
