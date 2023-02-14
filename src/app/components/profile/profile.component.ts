import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Collection } from 'src/app/models/collection';
import { LoggedCollectorService } from 'src/app/security/logged-collector.service';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  privateCollections$!: Observable<Collection[]>;

  constructor(
    public loggedCollectorService: LoggedCollectorService,
    private collectionService: CollectionService) { }

  ngOnInit(): void {
    
    this.privateCollections$ = this.collectionService.getPersonalCollections();

  }

  //prendo il valore del collezionista loggato
  get loggedCollector() {
    return this.loggedCollectorService.getCurrentCollectorValue();
  }

 


 


}
