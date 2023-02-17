import { Component, OnDestroy, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import {
  MatPaginatorDefaultOptions,
  PageEvent,
} from "@angular/material/paginator";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  of,
  startWith,
  Subject,
  Subscription,
  switchMap,
} from "rxjs";
import { Collector } from "src/app/models/collector";
import { PageableResponse } from "src/app/models/pageable-response";
import { CollectionService } from "src/app/services/collection.service";
import { SearchService } from "src/app/services/search.service";

@Component({
  selector: "app-add-collector-to-share",
  templateUrl: "./add-collector-to-share.component.html",
  styleUrls: ["./add-collector-to-share.component.scss"],
})
export class AddCollectorToShareComponent implements OnInit, OnDestroy {
  collectionId!: number;
  collectors$ = new Subject<PageableResponse<Collector>>();

  private _collectors!: PageableResponse<Collector>;
  searchControl: FormControl = new FormControl("");

  pageSize = 20;

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private snackbar: MatSnackBar,
    private searchService: SearchService
  ) {}

  ngOnInit(): void {
    this.subscription = this.route.queryParamMap
      .pipe(
        switchMap((params) => {
          this.collectionId = Number(params.get("collectionId"));
          if (!this.collectionId) {
            console.error("No collection id found");
            throw new Error("Collection id not found");
          }
          return this.collectionService.getCollectorsNotInCollection(
            this.collectionId,
            this.pageSize,
            0
          );
        })
      )
      .subscribe((collectorPage) => {
        this._collectors = collectorPage;
        this.collectors$.next(collectorPage);
      });

    const search$ = this.searchControl.valueChanges;

    search$
      .pipe(
        switchMap((search) => {
          if (search === "") {
            return of(this._collectors);
          } else {
            return this.searchService.searchCollectorsNotInCollection(
              search,
              this.collectionId,
              this.pageSize,
              0
            );
          }
        })
      )
      .subscribe((collectorPage) => this.collectors$.next(collectorPage));
  }

  shareWithCollector(collectorId: number) {
    this.collectionService
      .shareCollection([collectorId], this.collectionId)
      .pipe(
        switchMap(() =>
          this.collectionService.getCollectorsNotInCollection(
            this.collectionId,
            this.pageSize,
            0
          )
        )
      )
      .subscribe({
        next: (collectorPage) => {
          this.collectors$.next(collectorPage);
          this.snackbar.open("Collectors added to share list", "Close", {
            duration: 3000,
          });
        },
        error: (err) => {
          if (err.status === 400) {
            this.snackbar.open(
              "Ops, something went wrong. Try again later.",
              "Close",
              {
                duration: 3000,
              }
            );
          }
        },
      });
  }

  handlePageChange(event: PageEvent) {
    this.collectionService
      .getCollectorsNotInCollection(this.collectionId, this.pageSize, event.pageIndex)
      .subscribe((collectorPage) => {
        this.collectors$.next(collectorPage);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
