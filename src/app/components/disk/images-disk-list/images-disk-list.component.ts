import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, switchMap } from "rxjs";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { DiskService } from "src/app/services/disk.service";

@Component({
  selector: "app-images-disk-list",
  templateUrl: "./images-disk-list.component.html",
  styleUrls: ["./images-disk-list.component.scss"],
})
export class ImagesDiskListComponent implements OnInit {
  diskImages$ = new BehaviorSubject<{ imageId: number; base64Image: string }[]>(
    []
  );
  collectionId!: number;
  diskId!: number;
  loggedCollector!: any;
  ownerIdParam!: string | null;

  constructor(
    private diskService: DiskService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer,
    private loggedCollectorService: LoggedCollectorService
  ) {}

  ngOnInit(): void {
    this.collectionId = this.route.snapshot.params["collectionId"];

    this.diskId = this.route.snapshot.params["diskId"];

    this.ownerIdParam = this.route.snapshot.queryParamMap.get("ownerId");


    this.loggedCollector = this.loggedCollectorService.getCurrentCollectorValue();



    this.diskService
      .getDiskImages(this.collectionId, this.diskId)
      .subscribe((images) => this.diskImages$.next(images));
  }

  selectFile(event: any): void {
    const selectedFile = event.target.files;

    if (selectedFile) {
      const file: File | null = selectedFile.item(0);

      if (file) {
        this.diskService
          .addDiskImage(this.collectionId, this.diskId, file)
          .pipe(
            switchMap(() =>
              this.diskService.getDiskImages(this.collectionId, this.diskId)
            )
          )
          .subscribe((images) => this.diskImages$.next(images));
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
    const blob = new Blob([arrayBuffer], { type: "image/jpeg" });
    const blobUrl = URL.createObjectURL(blob);

    return this.sanitizer.bypassSecurityTrustUrl(blobUrl);
  }

  deleteDiskImage(imageId: number) {
    this.diskService
      .deleteDiskImage(this.collectionId, this.diskId, imageId)
      .pipe(
        switchMap(() =>
          this.diskService.getDiskImages(this.collectionId, this.diskId)
        )
      )
      .subscribe((images) => this.diskImages$.next(images));
  }

  isOwner() {
    return this.loggedCollector?.id == this.ownerIdParam;
  }
}
