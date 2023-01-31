import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { CONSTANTS } from "src/app/constants";
import { Disk } from "src/app/models/disk";
import { Track } from "src/app/models/track";
import { DiskService } from "src/app/services/disk.service";
import { PersistenceService } from "src/app/services/persistence/persistence-service";
import { TrackService } from "src/app/services/track.service";

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

  constructor(
    private diskService: DiskService,
    private trackService: TrackService,
    private route: ActivatedRoute,
    private persistenceService: PersistenceService
  ) {}

  ngOnInit(): void {
    const collectionId = this.route.snapshot.params["collectionId"];

    const diskId = this.route.snapshot.params["diskId"];

    this.isUserLogged = !!this.persistenceService.get(CONSTANTS.JWT_TOKEN_KEY);

    this.disk$ = this.diskService.getDiskById(collectionId, diskId);

    this.disks$ = this.diskService.getDisksOfCollection(collectionId);

    this.tracks$ = this.trackService.getTracksOfDisk(collectionId, diskId);
  }
}
