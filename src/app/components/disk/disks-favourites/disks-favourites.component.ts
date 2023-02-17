import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { DiskService } from "src/app/services/disk.service";

@Component({
  selector: "app-disks-favourites",
  templateUrl: "./disks-favourites.component.html",
  styleUrls: ["./disks-favourites.component.scss"],
})
export class DisksFavouritesComponent implements OnInit {
  collectionId!: number;
  disks$ = new BehaviorSubject<Disk[]>([]);
  collectorId!: number;

  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.collectorId = this.route.snapshot.params["collectorId"];

    this.diskService.getDisksFromFavorites(this.collectorId).subscribe(disks => this.disks$.next(disks));
  }

  deleteDiskFromFav(collectorId: number, diskId: number) {
    this.diskService.deleteDiskFromFav(collectorId, diskId).pipe(
      switchMap(() => this.diskService.getDisksFromFavorites(this.collectorId))
    ).subscribe((disks) => this.disks$.next(disks));
  }
}
