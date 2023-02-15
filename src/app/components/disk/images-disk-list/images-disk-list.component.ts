import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { DiskService } from 'src/app/services/disk.service';

@Component({
  selector: 'app-images-disk-list',
  templateUrl: './images-disk-list.component.html',
  styleUrls: ['./images-disk-list.component.scss']
})
export class ImagesDiskListComponent implements OnInit {



  diskImages$!: Observable<{ imageId: number; base64Image: string }[]>;
  collectionId!: number
  diskId!: number


  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
    
  ) { }

  ngOnInit(): void {

    this.collectionId = this.route.snapshot.params["collectionId"];

    this.diskId = this.route.snapshot.params["diskId"];

    this.diskImages$ = this.diskService.getDiskImages(
      this.collectionId,
      this.diskId
    );
  }


     selectFile(event: any): void {
    const selectedFile = event.target.files;
    
    if (selectedFile) {
      const file: File | null = selectedFile.item(0);

      if(file) {
        this.diskService.addDiskImage(this.collectionId, this.diskId, file).subscribe(() => {
          this.diskImages$ = this.diskService.getDiskImages(
            this.collectionId,
            this.diskId
          );
        })
      }
    }
  }
  
  generateBlobUrl(base64Image: string): SafeUrl {
    const binaryString = atob(base64Image);

    // convert the binary string into an array buffer
    const arrayBuffer = new ArrayBuffer(binaryString.length);
    const uint8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < binaryString.length; i++) {
      uint8Array[i] = binaryString.charCodeAt(i);
    }

    // create an Image object with the array buffer
    const blobUrl = URL.createObjectURL(
      new Blob([arrayBuffer], { type: "image/jpeg" })
    );

    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }





}
