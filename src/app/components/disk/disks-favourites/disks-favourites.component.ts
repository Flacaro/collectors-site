import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Disk } from 'src/app/models/disk';
import { DiskService } from 'src/app/services/disk.service';

@Component({
  selector: 'app-disks-favourites',
  templateUrl: './disks-favourites.component.html',
  styleUrls: ['./disks-favourites.component.scss']
})
export class DisksFavouritesComponent  implements OnInit{

  collectionId!: number;
  disks$!: Observable<Disk[]>;
  collectorId!: number;

  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute
  ) { }
  ngOnInit(): void {

    this.collectorId = this.route.snapshot.params["collectorId"];

  
    this.disks$ = this.diskService.getDisksFromFavorites(this.collectorId);
    
  }

  isFavoriteListEmpty(): boolean {
     this.disks$ == null;
     return true;
  }


 
}
