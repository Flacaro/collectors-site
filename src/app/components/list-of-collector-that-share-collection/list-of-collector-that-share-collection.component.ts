import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Collector } from 'src/app/models/collector';
import { CollectionService } from 'src/app/services/collection.service';

import { CollectorService } from 'src/app/services/collector.service';


@Component({
  selector: 'app-list-of-collector-that-share-collection',
  templateUrl: './list-of-collector-that-share-collection.component.html',
  styleUrls: ['./list-of-collector-that-share-collection.component.scss']
})
export class ListOfCollectorThatShareCollectionComponent  implements OnInit {

  collectors$!: Observable<Collector []>;
  collectionId!: number;
  collection!: any;
  collectorsIds!: number[];
  collectorsIdsToDelete!: number[];
  allCollectors$!: Observable<Collector []>;


  constructor(
    private route : ActivatedRoute,
    private dialog: MatDialog,
    private collectorService: CollectorService,
    private collectionService: CollectionService,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params['collectionId'];

    this.collection = this.collectionService.getPersonalCollectionById(this.collectionId);

    this.collectors$ = this.collectorService.getCollectorsThatShareTheCollection(this.collectionId);

    this.collectors$.subscribe((collectors) => {
      this.collectorsIds = collectors.map((collector) => collector.id);
    }
    );


    this.allCollectors$ = this.collectorService.getAllCollectors();


  }
 

  deleteCollectorFromMyCollection(collectorId: number) {
    //push on the array the collectorId to delete
    this.collectorsIdsToDelete = [collectorId];
    //pass the array to the service
    debugger;
    this.collectionService.unshareCollection(this.collectorsIdsToDelete, this.collectionId);
    //reload the page
    this.router.navigate(['/personal/collections']);

  }
    
  }






  

