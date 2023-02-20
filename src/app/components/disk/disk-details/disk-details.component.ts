import { Component, OnInit, ViewChild } from "@angular/core";
import { ActivatedRoute} from "@angular/router";
import { filter, Observable, of, switchMap, tap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { Track } from "src/app/models/track";
import { DiskService } from "src/app/services/disk.service";
import { TrackService } from "src/app/services/track.service";
import { MatDialog } from "@angular/material/dialog";
import { TrackDialogComponent } from "../../track/track-dialog/track-dialog.component";
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
  imageUrl!: SafeUrl;
  ownerIdParam!: string | null;

  readonly backUrl = "../../"

  @ViewChild("targetImage") targetImage!: HTMLImageElement;

  diskImages$!: Observable<{ imageId: number; base64Image: string }[]>;

  private collectionOwnerId!: number;

  constructor(
    private dialog: MatDialog,
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private loggedCollectorService: LoggedCollectorService,
    private snackbar: MatSnackBar,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    const loggedCollector =
      this.loggedCollectorService.getCurrentCollectorValue();
    if (loggedCollector) {
      this.loggedCollector = loggedCollector;
      this.collectorId = loggedCollector?.id;
    }

    this.collectionId = this.route.snapshot.params["collectionId"];

    this.diskId = this.route.snapshot.params["diskId"];

    this.ownerIdParam = this.route.snapshot.queryParamMap.get("ownerId");

    if (this.ownerIdParam) {
      this.collectionOwnerId = parseInt(this.ownerIdParam);
    }

    if (this.loggedCollector?.id === this.collectionOwnerId) {
      this.disk$ = this.diskService.getPersonalDiskById(
        this.collectionId,
        this.diskId
      );
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

    this.imageUrl = this.diskService
      .getDiskImages(this.collectionId, this.diskId)
      .subscribe({
        next: (result) => {
          if (result.length) {
            this.imageUrl = this.generateBlobUrl(result[0].base64Image);
          } else {
            this.imageUrl = "assets/img/default_disk.jpg";
          }
        },
      });

    this.diskImages$ = this.diskService.getDiskImages(
      this.collectionId,
      this.diskId
    );
  }

  generateBlobUrl(base64Image: string): SafeUrl {
    const binaryString = atob(base64Image);

    // convert the binary string into an array buffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // create an Image object with the array buffer
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" })
    const blobUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }

  openDialog() {
    const collectionId = this.route.snapshot.params["collectionId"];

    this.dialog
      .open(TrackDialogComponent, {
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
    if (this.loggedCollector) {
      this.collectorId = this.loggedCollector?.id;
    }

    this.diskService.addDiskToFav(this.collectorId, this.diskId).subscribe({
      next: () => {
        this.snackbar.open("Disk added to favourites", "Close", {
          duration: 3000,
        });
      },
      error: (err) => {
        if (err.status === 400) {
          this.snackbar.open("Disk already in favourites", "Close", {
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
    this.diskService
      .deleteDiskFromCollection(this.collectionId, this.diskId)
      .subscribe({
        next: () => {
          this.snackbar.open("Disk deleted successfully", "Close", {
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

  isDiskInFavList() {
    this.disk$ == null;
    return true;
  }

  isOwner() {
    return this.loggedCollector?.id === this.collectionOwnerId;
  }
}
