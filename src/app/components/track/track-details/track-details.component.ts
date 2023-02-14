import {Component, OnInit} from '@angular/core';
import {filter, Observable} from "rxjs";

import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute} from "@angular/router";
import { TrackService } from 'src/app/services/track.service';
import { DiskService } from 'src/app/services/disk.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Track } from 'src/app/models/track';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})

export class TrackDetailsComponent implements OnInit {

  track$!: Observable<Track>;
  tracks$!: Observable<Track[]>;
  owner: any;
  privateOrPublic!: string;
  collectionId = this.route.snapshot.params["collectionId"];


  constructor (
      private dialog: MatDialog,
      private trackService: TrackService,
      private diskService: DiskService,
      private collectionService: CollectionService,
      private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

  this.owner = this.collectionService.getOwnerOfACollection(this.collectionId);

    const collectionId = this.route.snapshot.params["collectionId"];

    const diskId = this.route.snapshot.params["diskId"];

    const trackId = this.route.snapshot.params["trackId"];

    if (this.owner != null) {
      this.track$ = this.trackService.getPersonalTrackById(collectionId, diskId, trackId);
    } else {
      this.track$ = this.trackService.getTrackById(collectionId, diskId, trackId);
    }
    
}
}

