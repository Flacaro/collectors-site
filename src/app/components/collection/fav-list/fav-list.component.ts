import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Collector } from 'src/app/models/collector';
import { CollectorService } from 'src/app/services/collector.service';

@Component({
  selector: 'app-fav-list',
  templateUrl: './fav-list.component.html',
  styleUrls: ['./fav-list.component.scss']
})
export class FavListComponent  implements OnInit{

  collectors$!: Observable<Collector[]>;

  constructor(
    private collectorService: CollectorService,
    private route : ActivatedRoute
  ) { }
  

    ngOnInit(): void {
      var collectionId = this.route.snapshot.params["collectionId"];

      this.collectors$ = this.collectorService.getCollectorsListInShared(collectionId);
    
  }
}
