import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { Collection } from 'src/app/models/collection';
import { CollectionService } from 'src/app/services/collection.service';

@Component({
  selector: 'app-collections-shared-with-me',
  templateUrl: './collections-shared-with-me.component.html',
  styleUrls: ['./collections-shared-with-me.component.scss']
})
export class CollectionsSharedWithMeComponent implements OnInit {

collections$!: Observable<Collection []>;
isPublic!: string;
isPrivateOrPublic!: string;


  constructor(
    private collectionService: CollectionService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {

    this.collections$ = this.collectionService.getCollectionSharedWithMe();
    
    //if collection is public, then isPrivateOrPublic is true
    //if collection is private, then isPrivateOrPublic is false
    this.isPublic = this.route.snapshot.queryParamMap.get("isPublic") || "false";
    if(this.isPublic === "true"){
      debugger;
      this.isPrivateOrPublic = "/public";
    }else{
      this.isPrivateOrPublic = "/private";
    }

    


  }

}


