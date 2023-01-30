import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CONSTANTS } from 'src/app/constants';
import { Disk } from 'src/app/models/disk';
import { CollectionService } from 'src/app/services/collection.service';
import { DiskService } from 'src/app/services/disk.service';


@Component({
  selector: 'app-disk-details',
  templateUrl: './disk-details.component.html',
  styleUrls: ['./disk-details.component.scss']
})
export class DiskDetailsComponent implements OnInit {

  disk$!: Observable<Disk>;
  disks$!: Observable<Disk []>;
  isUserLogged!: boolean;


  constructor (
    private diskService: DiskService,
    private collectionService: CollectionService,
    private route: ActivatedRoute
 
  ) {}


  ngOnInit(): void {

    const collectionId = this.route.snapshot.params["collectionId"];
  
    const diskId = this.route.snapshot.params["diskId"];
    
    this.isUserLogged = !!localStorage.getItem(CONSTANTS.JWT_TOKEN_KEY);

    this.disk$ = this.diskService.getDiskById(collectionId, diskId);
    
    this.disks$ = this.diskService.getDisksOfCollection(collectionId);
  }


}

