import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, Observable, of, switchMap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { Track } from "src/app/models/track";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { TrackService } from "src/app/services/track.service";
import { CollectionService } from "src/app/services/collection.service";
import { MatDialog } from "@angular/material/dialog";
import { TrackDialogComponent } from "../../track/track-dialog/track-dialog.component";
import { Collection } from "src/app/models/collection";

@Component({
  selector: "app-disk-details",
  templateUrl: "./disk-details.component.html",
  styleUrls: ["./disk-details.component.scss"],
})
export class DiskDetailsComponent implements OnInit {
  disk$!: Observable<Disk>;
  disks$!: Observable<Disk[]>;
  tracks$!: Observable<Track[]>;
  isUserLogged!: boolean;
  diskId!: number;
  collection$!: Observable<Collection>;
  privateOrPublic!: string;
  isPublic!: string;

  constructor(
    private dialog: MatDialog,
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private persistenceService: PersistenceService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const collectionId = this.route.snapshot.params["collectionId"];
    this.diskId = this.route.snapshot.params["diskId"];

    this.isPublic =
      this.route.snapshot.queryParamMap.get("isPublic") || "false";

    if (this.isPublic === "true") {
      this.collection$ =
        this.collectionService.getPublicCollection(collectionId);
      this.privateOrPublic = "/public";
      this.disk$ = this.diskService.getDiskOfPublicCollection(
        collectionId,
        this.diskId
      );
      console.log(this.isPublic);
      this.tracks$ = this.trackService.getPublicTracksOfDisk(
        collectionId,
        this.diskId
      );
    } else {
      this.collection$ =
        this.collectionService.getPrivateCollection(collectionId);
      this.privateOrPublic = "/private";
      this.disk$ = this.diskService.getDiskOfPrivateCollection(
        collectionId,
        this.diskId
      );
      console.log(this.isPublic);
      this.tracks$ = this.trackService.getPrivateTracksOfDisk(
        collectionId,
        this.diskId
      );
    }
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
          this.trackService.getPrivateTracksOfDisk(collectionId, this.diskId)
        )
      )
      .subscribe((result) => {
        this.tracks$ = of(result);
      });
  }
}
