import {Component, OnInit} from '@angular/core';
import {filter, Observable} from "rxjs";

import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import { TrackService } from 'src/app/services/track.service';
import { DiskService } from 'src/app/services/disk.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Track } from 'src/app/models/track';
import { MatSnackBar } from '@angular/material/snack-bar';

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
  diskId = this.route.snapshot.params["diskId"];
  trackId = this.route.snapshot.params["trackId"];


  constructor (
      private dialog: MatDialog,
      private trackService: TrackService,
      private diskService: DiskService,
      private collectionService: CollectionService,
      private route: ActivatedRoute,
      private snackbar: MatSnackBar,
      private router: Router

  ) {}

  ngOnInit(): void {

  this.owner = this.collectionService.getOwnerOfACollection(this.collectionId);


    if (this.owner != null) {
      this.track$ = this.trackService.getPersonalTrackById(this.collectionId, this.diskId, this.trackId);
    } else {
      this.track$ = this.trackService.getTrackById(this.collectionId, this.diskId, this.trackId);
    }
    
}



deleteTrack() {
  this.trackService.deleteTrack(this.collectionId, this.diskId, this.trackId).subscribe({
    next: () => {
      this.snackbar.open("Collection deleted successfully", "Close", {
        duration: 3000,
      });
      this.router.navigate(["../../"], { relativeTo: this.route, queryParamsHandling: 'preserve' });
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

