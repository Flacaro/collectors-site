import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
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
import { LoggedCollectorService } from "src/app/security/logged-collector.service";

@Component({
  selector: "app-disk-details",
  templateUrl: "./disk-details.component.html",
  styleUrls: ["./disk-details.component.scss"],
})
export class DiskDetailsComponent implements OnInit {
  disk$!: Observable<Disk>;
  tracks$!: Observable<Track[]>;
  diskId!: number;
  loggedCollector!: any;
  allCollections$!: Observable<Collection[]>;
  ownersIds: any[] = [];



  constructor(
    private dialog: MatDialog,
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private loggedCollectorService: LoggedCollectorService

  ) {}

  ngOnInit(): void {

    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();

    const collectionId = this.route.snapshot.params["collectionId"];
    
    this.diskId = this.route.snapshot.params["diskId"];

    this.allCollections$ = this.collectionService.getAllCollections();

    this.allCollections$.subscribe(result => {
      result.forEach(collection => {
        this.ownersIds.push(collection.ownerId);
      });
    });
    
    if (this.ownersIds.includes(this.loggedCollector.id)) {
      this.disk$ = this.diskService.getPersonalDiskById(collectionId, this.diskId);
      this.tracks$ = this.trackService.getPersonalTracksOfDisk(collectionId,this.diskId);
    } else {
      this.disk$ = this.diskService.getDiskById(collectionId, this.diskId);
      this.tracks$ = this.trackService.getTracksOfDisk( collectionId, this.diskId);
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
