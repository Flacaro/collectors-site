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

  isCollectionFavListEmpty(): boolean {
    let empty = true;
    this.collections$.subscribe((collections) => {
      if(collections.length > 0) {
        empty = false;
      }
    });
    return empty;
  }


}
