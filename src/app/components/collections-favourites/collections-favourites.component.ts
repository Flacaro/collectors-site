import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-favourites',
  templateUrl: './collections-favourites.component.html',
  styleUrls: ['./collections-favourites.component.scss']
})
export class CollectionsFavouritesComponent {

  collectionsFavourites$!: Observable<Collection[]>;
  collectionsFavourites: Collection[] = [];


  constructor(
    private collectionService: CollectionService,
  ) { }

  ngOnInit(): void {
    this.collectionsFavourites$ = this.collectionService.getFavouriteCollections();
    this.collectionsFavourites$.subscribe(collections => {
      this.collectionsFavourites = collections;
    }
    );
  }

  isCollectionFavListEmpty(): boolean {
    return this.collectionsFavourites.length === 0;
  }


}
