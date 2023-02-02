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
  isPublic!: string;
  privateOrPublic!: string;

  constructor (
      private dialog: MatDialog,
      private trackService: TrackService,
      private diskService: DiskService,
      private collectionService: CollectionService,
      private route: ActivatedRoute

  ) {}

  ngOnInit(): void {

  this.isUserLogged = !!localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);

    const collectionId = this.route.snapshot.params["collectionId"];

    const diskId = this.route.snapshot.params["diskId"];

    const trackId = this.route.snapshot.params["trackId"];

    this.isPublic = this.route.snapshot.queryParamMap.get("isPublic") || "false";

    if (this.isPublic === "true") {
      this.privateOrPublic = "/public";

    this.track$ = this.trackService.getPublicTrackById(collectionId, diskId, trackId);
    this.privateOrPublic = "/public";

  } else {
    this.track$ = this.trackService.getPrivateTrackById(collectionId, diskId, trackId);
    this.privateOrPublic = "/private";
  }

}
}

