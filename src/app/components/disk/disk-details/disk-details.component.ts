import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { filter, Observable, of, switchMap, tap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { Track } from "src/app/models/track";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { TrackService } from "src/app/services/track.service";
import { CollectionService } from "src/app/services/collection.service";
import { MatDialog } from "@angular/material/dialog";
import { TrackDialogComponent } from "../../track/track-dialog/track-dialog.component";
import { Collection } from "src/app/models/collection";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { Collector } from "src/app/models/collector";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-disk-details",
  templateUrl: "./disk-details.component.html",
  styleUrls: ["./disk-details.component.scss"],
})
export class DiskDetailsComponent implements OnInit {
  disk$!: Observable<Disk>;
  tracks$!: Observable<Track[]>;
  diskId!: number;
  loggedCollector: Collector | null = null;
  collectionId!: number;
  collectorId!: number;

  @ViewChild("targetImage") targetImage!: HTMLImageElement;

  diskImages$!: Observable<{ imageId: number; base64Image: string }[]>;

  private collectionOwnerId!: number;



  constructor(
    private dialog: MatDialog,
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService,
    private snackbar: MatSnackBar,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const loggedCollector =
      this.loggedCollectorService.getCurrentCollectorValue();
    if (loggedCollector) {
      this.loggedCollector = loggedCollector;
      this.collectorId = loggedCollector?.id 
    }


    this.collectionId = this.route.snapshot.params["collectionId"];

    this.diskId = this.route.snapshot.params["diskId"];

    const ownerIdParam = this.route.snapshot.queryParamMap.get("ownerId");

    if (ownerIdParam) {
      this.collectionOwnerId = parseInt(ownerIdParam);
    }

    if (this.loggedCollector?.id === this.collectionOwnerId) {
      this.disk$ = this.diskService
        .getPersonalDiskById(this.collectionId, this.diskId)
        .pipe(tap(console.log));
      this.tracks$ = this.trackService.getPersonalTracksOfDisk(
        this.collectionId,
        this.diskId
      );
    } else {
      this.disk$ = this.diskService.getDiskById(this.collectionId, this.diskId);
      this.tracks$ = this.trackService.getTracksOfDisk(
        this.collectionId,
        this.diskId
      );
    }

    this.diskImages$ = this.diskService.getDiskImages(
      this.collectionId,
      this.diskId
    );
  }



  openDialog() {
    const collectionId = this.route.snapshot.params["collectionId"];

    this.dialog
      .open(TrackDialogComponent, {
        //componente,optionalConfiguration
        width: "500px",
      })
      .afterClosed()
      .pipe(
        filter((trackFormData) => !!trackFormData),
        switchMap((trackFormData) =>
          this.trackService.addTrackToDisk(
            collectionId,
            this.diskId,
            trackFormData
          )
        ),
        switchMap(() =>
          this.trackService.getPersonalTracksOfDisk(collectionId, this.diskId)
        )
      )
      .subscribe((result) => {
        this.tracks$ = of(result);
      });
  }


  addDiskToFav() {

    this.diskService.addDiskToFav(this.collectionOwnerId, this.diskId).subscribe({
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



  deleteDisk() {
    this.diskService.deleteDiskFromCollection(this.collectionId, this.diskId).subscribe({
      next: () => {
        this.snackbar.open("Collection deleted successfully", "Close", {
          duration: 3000,
        });
        window.history.back();
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

}
