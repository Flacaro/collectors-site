import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";

import {ActivatedRoute, Router} from "@angular/router";
import { TrackService } from 'src/app/services/track.service';
import { CollectionService } from 'src/app/services/collection.service';
import { Track } from 'src/app/models/track';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';

@Component({
  selector: 'app-track-details',
  templateUrl: './track-details.component.html',
  styleUrls: ['./track-details.component.scss']
})

export class TrackDetailsComponent implements OnInit {

  track$!: Observable<Track>;
  tracks$!: Observable<Track[]>;
  ownerId: any;
  privateOrPublic!: string;
  collectionId = this.route.snapshot.params["collectionId"];
  diskId = this.route.snapshot.params["diskId"];
  trackId = this.route.snapshot.params["trackId"];
  loggedCollector: any;


  constructor (
      private trackService: TrackService,
      private collectionService: CollectionService,
      private route: ActivatedRoute,
      private snackbar: MatSnackBar,
      private router: Router,
      private loggedCollectorService: LoggedCollectorService,

  ) {}

  ngOnInit(): void {

  this.ownerId = this.route.snapshot.queryParamMap.get("ownerId");

  this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();


    if (this.loggedCollector.id == this.ownerId) {
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

isOwner() {
  if (this.loggedCollector.id == this.ownerId) {
    return true;
  } else {
    return false;
  }
}

}

