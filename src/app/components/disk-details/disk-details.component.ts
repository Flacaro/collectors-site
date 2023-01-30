import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Disk } from 'src/app/models/disk';
import { CollectionService } from 'src/app/services/collection.service';
import { DiskServiceService } from 'src/app/services/disk-service.service';


@Component({
  selector: 'app-disk-details',
  templateUrl: './disk-details.component.html',
  styleUrls: ['./disk-details.component.scss']
})
export class DiskDetailsComponent implements OnInit {

  disk: Disk | undefined;

  constructor (
    private diskService: DiskServiceService,
    private collectionService: CollectionService,
    private route: ActivatedRoute
 
  ) {}


  ngOnInit(): void {

    const collectionId = this.route.snapshot.params["collectionId"];
  
    const diskId = this.route.snapshot.params["diskId"];

    this.diskService.getDiskById(collectionId, diskId).subscribe(
      (data) => {
        this.disk = data;
      }
    );
  }


}

