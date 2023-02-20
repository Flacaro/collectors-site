import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { catchError, EMPTY, filter, Observable, of, switchMap } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { Collection } from "src/app/models/collection";
import { CollectionService } from "src/app/services/collection.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { CollectionDialogComponent } from "../collection-dialog/collection-dialog.component";

@Component({
  selector: "app-collections",
  templateUrl: "./collections.component.html",
  styleUrls: ["./collections.component.scss"],
})
export class CollectionsComponent implements OnInit {
  collections$!: Observable<Collection[]>;

  constructor(
    private collectionService: CollectionService,
    private persistenceService: PersistenceService,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.collections$ = this.collectionService.getPersonalCollections();
  }

  openDialog() {
    const collectorId = this.persistenceService.get(
      CONSTANTS.LOGGED_COLLECTOR_KEY
    );

    this.dialog
      .open(CollectionDialogComponent, {
        width: "500px",
      })
      .afterClosed()
      .pipe(
        filter((collectionFormData) => !!collectionFormData),
        switchMap((collectionFormData) =>
          this.collectionService.addCollection(collectionFormData)
        ),
        switchMap(() => this.collectionService.getPersonalCollections()),
        catchError((error) => {
          this.snackBar.open("The collection with this name already exist", "X", {
            duration: 2000,
          });
          return EMPTY;
        })
      )
      .subscribe((result) => {
        this.collections$ = of(result);
      });
  }
}
