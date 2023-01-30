import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections',
  templateUrl: './collections.component.html',
  styleUrls: ['./collections.component.scss']
})
export class CollectionsComponent {

  collections$ = this.collectionService.getCollections();

  collectionId = this.route.snapshot.params['collectionId'];

  collection$ = this.collectionService.getCollection(this.collectionId);
  
  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) { }

  //prendo le collezioni private del collezionista loggato
  



}
