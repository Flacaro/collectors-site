import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, switchMap } from 'rxjs';
import { Collector } from 'src/app/models/collector';

import { CollectorService } from 'src/app/services/collector.service';


@Component({
  selector: 'app-list-of-collector-that-share-collection',
  templateUrl: './list-of-collector-that-share-collection.component.html',
  styleUrls: ['./list-of-collector-that-share-collection.component.scss']
})
export class ListOfCollectorThatShareCollectionComponent implements OnInit {

  collectors$ = new BehaviorSubject<Collector[]>([]);
  collectionId!: number;

  constructor(
    private route: ActivatedRoute,
    private collectorService: CollectorService,
    private snackBar: MatSnackBar,
  ) { }

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params['collectionId'];

    this.collectorService.getCollectorsThatShareTheCollection(this.collectionId).subscribe(
      collectors => this.collectors$.next(collectors)
    );

  }


  deleteCollectorFromMyCollection(collectorId: number, event: any) {
    event.stopPropagation();
    this.collectorService.deleteCollectionFromSharedList(this.collectionId, collectorId).pipe(
      switchMap(() =>
        this.collectorService.getCollectorsThatShareTheCollection(this.collectionId)
      )
    ).subscribe((collectors) => {
        this.collectors$.next(collectors);
        this.snackBar.open("Successfully removed collector", "x");
      });
  }

}








