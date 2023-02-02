
import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { filter, Observable } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { Disk } from "src/app/models/disk";
import { Track } from "src/app/models/track";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { TrackService } from "src/app/services/track.service";
import { CollectionService } from 'src/app/services/collection.service';
import {MatDialog} from "@angular/material/dialog";
import {TrackDialogComponent} from "../track-dialog/track-dialog.component";
import {Collection} from "../../models/collection";


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



  constructor (
    private dialog: MatDialog,
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private persistenceService: PersistenceService,
    private collectionService: CollectionService
  ) {}

  ngOnInit(): void {
    const collectionId = this.route.snapshot.params["collectionId"];

    // this.collection$ = this.collectionService.getCollection(collectionId);
  
    this.diskId = this.route.snapshot.params["diskId"];

    this.isUserLogged = !!this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);

    this.disk$ = this.diskService.getDiskById(collectionId, this.diskId);
    
    this.disks$ = this.diskService.getDisksOfCollection(collectionId);

    this.tracks$ = this.trackService.getTracksOfDisk(collectionId, this.diskId);
  }


  openDialog() {
    this.dialog.open(TrackDialogComponent, { //componente,optionalConfiguration
      width: "500px",
    }).afterClosed().pipe(
        filter(result => !!result)
    ).subscribe(result => {
      console.log(result);
    });
  }
}


