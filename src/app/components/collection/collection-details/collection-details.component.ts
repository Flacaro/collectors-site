import { Component, OnInit, ViewChild } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatMenuTrigger } from "@angular/material/menu";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute, Router } from "@angular/router";
import {
  BehaviorSubject,
  filter,
  map,
  Observable,
  of,
  switchMap,
  tap,
  window,
} from "rxjs";
import { Collection } from "src/app/models/collection";
import { Disk } from "src/app/models/disk";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";
import { DialogComponent } from "../../disk/diskAddDialog/dialog.component";
import { ImportDiskComponent } from "../../disk/import-disk/import-disk.component";

@Component({
  selector: "app-collection-details",
  templateUrl: "./collection-details.component.html",
  styleUrls: ["./collection-details.component.scss"],
})
export class CollectionDetailsComponent implements OnInit {
  disks$ = new BehaviorSubject<Disk[]>([]);
  collection$!: Observable<Collection>;
  allCollections$!: Observable<Collection[]>;
  owner: any;
  ownersIds: any[] = [];
  loggedCollector!: any;
  collectionById$!: Observable<Collection>;
  mostSearchedDisks: Disk[] = [];

  collectionId = this.route.snapshot.params["collectionId"];

  constructor(
    private dialog: MatDialog,
    private collectionService: CollectionService,
    private diskService: DiskService,
    private loggedCollectorService: LoggedCollectorService,
    private route: ActivatedRoute,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loggedCollector =
      this.loggedCollectorService.getCurrentCollectorValue();

    this.allCollections$ = this.collectionService.getAllCollections();

    this.allCollections$.subscribe((result) => {
      result.forEach((collection) => {
        this.ownersIds.push(collection.ownerId);
      });
    });

    //se ownersIdes contiene l'id del collector loggato, allora la collection è personale
    if (this.ownersIds.includes(this.loggedCollector.id)) {
      this.collection$ = this.collectionService.getPersonalCollectionById(
        this.collectionId
      );

      this.diskService
        .getDisksByPersonalCollectionId(this.collectionId)
        .subscribe((result) => this.disks$.next(result));
    } else {
      this.collection$ = this.collectionService.getPublicCollectionById(
        this.collectionId
      );
      this.diskService
        .getDisksByPublicCollectionId(this.collectionId)
        .subscribe((result) => this.disks$.next(result));
    }
  }

  private getDisksByPersonalCollectionId() {
    this.diskService
      .getDisksByPublicCollectionId(this.collectionId)
      .subscribe((result) => this.disks$.next(result));
  }

  openDialog() {
    this.dialog
      .open(DialogComponent, {
        width: "500px",
      })
      .afterClosed()
      .pipe(
        switchMap((disk: Disk | null) => {
          if (disk) {
            return this.diskService.addDiskToCollection(
              this.collectionId,
              disk
            );
          } else {
            return of(disk);
          }
        })
      )
      .subscribe(() => {
        this.getDisksByPersonalCollectionId();
      });
  }

  openImportDiskDialog() {
    this.dialog
      .open(ImportDiskComponent, {
        minWidth: "800px",
        maxWidth: "1200px",
        data: this.mostSearchedDisks,
      })
      .afterClosed()
      .pipe(
        switchMap((disk: Disk | null) => {
          if (disk) {
            return this.diskService.addDiskToCollection(
              this.collectionId,
              disk
            );
          } else {
            return of(disk);
          }
        })
      )
      .subscribe(() => {
        this.getDisksByPersonalCollectionId();
      });
  }

  addCollectiontoFav() {
    const collectionId = this.route.snapshot.params["collectionId"];

    this.collectionService.addCollectionToFavorites(collectionId).subscribe({
      next: () => {
        this.snackbar.open("Collection added to favourites", "Close", {
          duration: 3000,
        });
      },
      error: (err) => {
        if (err.status === 400) {
          this.snackbar.open("Collection already in favourites", "Close", {
            duration: 3000,
          });
        } else {
          this.snackbar.open(
            "Ops, something went wrong. Try again later.",
            "Close",
            {
              duration: 3000,
            }
          );
        }
      },
    });
  }

  deleteCollection() {
    this.collectionService.deleteCollection(this.collectionId).subscribe({
      next: () => {
        this.snackbar.open("Collection deleted successfully", "Close", {
          duration: 3000,
        });
        this.router.navigate(["../"], { relativeTo: this.route });
      },
      error: (err) => {
        this.snackbar.open(
          "Ops, something went wrong. Try again later.",
          "Close",
          {
            duration: 3000,
          }
        );
      },
    });
  }

  unshareCollection() {
    this.collectionService.unshareCollection(
      this.loggedCollector.id,
      this.collectionId
    );
    this.snackbar.open("Collection unshared successfully", "Close", {
      duration: 3000,
    });
    this.router.navigate(["../"], { relativeTo: this.route });
  }
}
