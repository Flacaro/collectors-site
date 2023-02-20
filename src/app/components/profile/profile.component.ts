import { Component, OnInit } from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { BehaviorSubject, catchError, EMPTY, switchMap } from "rxjs";
import { Observable } from "rxjs/internal/Observable";
import { Collection } from "src/app/models/collection";
import { Statistics } from "src/app/models/statistics";
import { LoggedCollectorService } from "src/app/security/logged-collector.service";
import { CollectionService } from "src/app/services/collection.service";
import { CollectorService } from "src/app/services/collector.service";
import { StatisticsService } from "src/app/services/statistics.service";

@Component({
  selector: "app-profile",
  templateUrl: "./profile.component.html",
  styleUrls: ["./profile.component.scss"],
})
export class ProfileComponent implements OnInit {
  privateCollections$!: Observable<Collection[]>;
  image$ = new BehaviorSubject<SafeUrl | null>(null);

  statistics$!: Observable<Statistics.Statistics>;

  constructor(
    public loggedCollectorService: LoggedCollectorService,
    private collectorService: CollectorService,
    private collectionService: CollectionService,
    private sanitizer: DomSanitizer,
    private stasticsService: StatisticsService
  ) {}

  ngOnInit(): void {
    this.statistics$ = this.stasticsService.getPersonalStatistics();

    this.privateCollections$ = this.collectionService.getPersonalCollections();

    this.collectorService
      .getPersonalImages()
      .pipe(
        catchError((_) => {
          this.image$.next("assets/img/default_avatar.jpg");
          return EMPTY;
        })
      )
      .subscribe((image) =>
        this.image$.next(this.sanitizeImageUrl(URL.createObjectURL(image)))
      );
  }


  get loggedCollector() {
    return this.loggedCollectorService.getCurrentCollectorValue();
  }

  selectFile(event: any): void {
    const selectedFile = event.target.files;

    if (selectedFile) {
      const file: File | null = selectedFile.item(0);

      if (file) {
        this.collectorService
          .addCollectorImage(file)
          .pipe(switchMap(() => this.collectorService.getPersonalImages()))
          .subscribe((image) =>
            this.image$.next(this.sanitizeImageUrl(URL.createObjectURL(image)))
          );
      }
    }
  }

  private sanitizeImageUrl(url: string): SafeUrl {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }
}
