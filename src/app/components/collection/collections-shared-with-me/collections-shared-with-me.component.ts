import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';
import { CollectionService } from 'src/app/services/collection.service';
import { CollectorService } from 'src/app/services/collector.service';

@Component({
  selector: 'app-collections-shared-with-me',
  templateUrl: './collections-shared-with-me.component.html',
  styleUrls: ['./collections-shared-with-me.component.scss']
})
export class CollectionsSharedWithMeComponent implements OnInit {

  collections$!: Observable<Collection[]>;
  collectorId!: number | null;
  loggedCollector!: any;

  constructor(

    private route: ActivatedRoute,
    private loggedCollectorService: LoggedCollectorService,
    private collectorService: CollectorService,
    private router: Router,

  ) { }

  ngOnInit(): void {

    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();

    this.collections$ = this.collectorService.getCollectionSharedWithMe(this.loggedCollector.id);

  }

  deleteCollectionFromSharedList(collectionId: number) {
    this.collectorService.deleteCollectionFromSharedList(collectionId, this.loggedCollector.id).subscribe(
      () => this.router.navigate(['../'])
    );
  }

  isCollectionSharedListIsEMpty(): boolean {
    this.collections$ == null;
    return true;
  }



}









