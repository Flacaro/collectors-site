import {Component, OnInit} from '@angular/core';
import {filter, Observable} from "rxjs";
import {Disk} from "../../models/disk";
import {Track} from "../../models/track";
import {MatDialog} from "@angular/material/dialog";
import {DiskService} from "../../services/disk.service";
import {CollectionService} from "../../services/collection.service";
import {TrackService} from "../../services/track.service";
import {ActivatedRoute} from "@angular/router";
import {CONSTANTS} from "../../constants";
import {DialogComponent} from "../diskAddDialog/dialog.component";

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})

export class TrackDetailsComponent implements OnInit {

  track$!: Observable<Track>;
  tracks$!: Observable<Track[]>;
  isUserLogged!: boolean;

  constructor (
      private dialog: MatDialog,
      private trackService: TrackService,
      private diskService: DiskService,
      private collectionService: CollectionService,
      private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

    const collectionId = this.route.snapshot.params["collectionId"];

    const diskId = this.route.snapshot.params["diskId"];

    const trackId = this.route.snapshot.params["trackId"];

    this.isUserLogged = !!localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);

    this.track$ = this.trackService.getTrackById(collectionId, diskId, trackId);

  }

}

