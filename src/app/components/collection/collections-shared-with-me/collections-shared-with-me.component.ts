import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-shared-with-me',
  templateUrl: './collections-shared-with-me.component.html',
  styleUrls: ['./collections-shared-with-me.component.scss']
})
export class CollectionsSharedWithMeComponent implements OnInit {

collections$!: Observable<Collection []>;


  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute,
    private loggedCollectorService: LoggedCollectorService
  ) { }

  ngOnInit(): void {

    
    this.collections$ = this.collectionService.getCollectionSharedWithMe();



  }

  

}


