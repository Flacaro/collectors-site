import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-favourites',
  templateUrl: './collections-favourites.component.html',
  styleUrls: ['./collections-favourites.component.scss']
})
export class CollectionsFavouritesComponent {

  collections$ = this.collectionService.getFavouriteCollections();
  

  constructor(
    private collectionService: CollectionService,
  ) { }

  ngOnInit(): void {
    
  }

  isCollectionFavNotEmpty(): boolean {
    if (this.collections$ == null) {
      return false;
    }
    return true;
  }

  isCollectionFavEmpty(): boolean {
    if (this.collections$ == null) {
      return true;
    }
    return false;
  }


}
