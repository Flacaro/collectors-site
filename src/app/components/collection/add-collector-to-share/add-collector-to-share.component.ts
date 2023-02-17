import { Component, OnDestroy, OnInit } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject, Observable, Subscription, switchMap } from "rxjs";
import { Collector } from "src/app/models/collector";
import { CollectionService } from "src/app/services/collection.service";

@Component({
  selector: "app-add-collector-to-share",
  templateUrl: "./add-collector-to-share.component.html",
  styleUrls: ["./add-collector-to-share.component.scss"],
})
export class AddCollectorToShareComponent implements OnInit, OnDestroy {
  collectionId!: number;
  collectors$ = new BehaviorSubject<Collector[]>([]);

  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private collectionService: CollectionService,
    private snackbar: MatSnackBar
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
            this.collectionId
          );
        })
      )
      .subscribe((collectors) => this.collectors$.next(collectors));
  }

  shareWithCollector(collectorId: number) {
    this.collectionService
      .shareCollection([collectorId], this.collectionId)
      .pipe(
        switchMap(() =>
          this.collectionService.getCollectorsNotInCollection(this.collectionId)
        )
      )
      .subscribe({
        next: (collectors) => {
          this.collectors$.next(collectors);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
