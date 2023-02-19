import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, catchError, EMPTY, Observable } from "rxjs";
import { Collection } from "src/app/models/collection";
import { Collector } from "src/app/models/collector";
import { CollectionService } from "src/app/services/collection.service";
import { CollectorService } from "src/app/services/collector.service";

@Component({
  selector: "app-public-profile",
  templateUrl: "./public-profile.component.html",
  styleUrls: ["./public-profile.component.scss"],
})
export class PublicProfileComponent implements OnInit {
  publicCollections$!: Observable<Collection[]>;
  collectorId!: number;
  collector$!: Observable<Collector>;
  image$ = new BehaviorSubject<SafeUrl | null>(null);

  constructor(
    private collectorService: CollectorService,
    private route: ActivatedRoute,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit(): void {
    this.collectorId = this.route.snapshot.params["collectorId"];

    this.collector$ = this.collectorService
      .getCollectorById(this.collectorId);

    this.collectorService
      .getCollectorProfileImages(this.collectorId)
      .pipe(
        catchError((_) => {
          this.image$.next("assets/img/default_avatar.jpg");
          return EMPTY;
        })
      )
      .subscribe((image: Blob) =>
        this.image$.next(this.sanitizeImageUrl(URL.createObjectURL(image)))
      );

    this.publicCollections$ =
      this.collectorService.getPublicCollectionsOfCollector(this.collectorId);
  }

  private sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
