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
  allCollections$!: Observable<Collection[]>;
  collectionId!: number;

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
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    const loggedCollector =
      this.loggedCollectorService.getCurrentCollectorValue();
    if (loggedCollector) {
      this.loggedCollector = loggedCollector;
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

  selectFile(event: any): void {
    const selectedFile = event.target.files;
    
    if (selectedFile) {
      const file: File | null = selectedFile.item(0);

      if(file) {
        this.diskService.addDiskImage(this.collectionId, this.diskId, file).subscribe(() => {
          // Fai quello che devi fare
        })
      }
    }
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
    const blobUrl = URL.createObjectURL(
      new Blob([arrayBuffer], { type: "image/jpeg" })
    );

    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
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

  addDisktoFav() {
    this.diskService.addDiskToFav(this.diskId).subscribe();
  }
}
