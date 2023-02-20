import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject, Observable, switchMap } from "rxjs";
import { Disk } from "src/app/models/disk";
import { CollectionService } from "src/app/services/collection.service";
import { DiskService } from "src/app/services/disk.service";

@Component({
  selector: "app-disks-favourites",
  templateUrl: "./disks-favourites.component.html",
  styleUrls: ["./disks-favourites.component.scss"],
})
export class DisksFavouritesComponent implements OnInit {
  disks$ = new BehaviorSubject<Disk[]>([]);
  collectorId!: number;
 

  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute,
    private collectionService: CollectionService,
  ) {}
  ngOnInit(): void {
    this.collectorId = this.route.snapshot.params["collectorId"];

  
    this.diskService.getDisksFromFavorites(this.collectorId).subscribe(disks => this.disks$.next(disks));
    
  


  }

  deleteDiskFromFav(collectorId: number, diskId: number, event: any) {
    event.stopPropagation();
    this.diskService.deleteDiskFromFav(collectorId, diskId).pipe(
      switchMap(() => this.diskService.getDisksFromFavorites(this.collectorId))
    ).subscribe((disks) => this.disks$.next(disks));
  }
}
