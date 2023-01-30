import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DiskService } from 'src/app/services/disk.service';

@Component({
  selector: 'app-disks-favourites',
  templateUrl: './disks-favourites.component.html',
  styleUrls: ['./disks-favourites.component.scss']
})
export class DisksFavouritesComponent {

  collectionId = this.route.snapshot.params["collectionId"];
  

  disks$ = this.diskService.getDiskFromFavorites();

  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute
  ) { }


  isDiskFavNotEmpty(): boolean {
    if (this.disks$ == null) {
      return false;
    }
    return true;
  }

  isDiskFavEmpty(): boolean {
    if (this.disks$ == null) {
      return true;
    }
    return false;
  }
}
