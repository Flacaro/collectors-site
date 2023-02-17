import { Component } from '@angular/core';
import { Router } from '@angular/router';
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



  constructor(
    private collectionService: CollectionService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.collectionsFavourites$ = this.collectionService.getFavoriteCollections();
  }


  deleteCollectionFromFav(collectionId: number) {
    this.collectionService.deleteCollectionFromFav(collectionId).subscribe(
      () => {
        this.collectionsFavourites$ = this.collectionService.getFavoriteCollections();
      }
    );

    this.router.navigate(['/collections/favourites']);
  }
}
  



