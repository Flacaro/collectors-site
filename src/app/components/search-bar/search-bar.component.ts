import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { debounceTime, distinctUntilChanged, filter, startWith, Subscription, tap } from "rxjs";

export type Search = {
  value: string;
  options?: {
    includePrivateCollections: boolean;
    includeSharedCollections: boolean;
  };
};

@Component({
  selector: "app-search-bar",
  template: `
    <form class="search-form" [formGroup]="searchGroup">
      <mat-form-field class="search-bar" appearance="outline">
        <mat-label>Search</mat-label>
        <input
          #search
          matInput
          type="search"
          placeholder="Cerca qualcosa..."
          formControlName="value"
        />
        <mat-icon matSuffix>search</mat-icon>
      </mat-form-field>

      <form
        class="options"
        *ngIf="isCollectorLogged"
        [formGroup]="optionsFormGroup"
      >
        <mat-checkbox formControlName="includePrivateCollections"
          >Include private collections</mat-checkbox
        >
        <mat-checkbox formControlName="includeSharedCollections"
          >Include private collections</mat-checkbox
        >
      </form>
    </form>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .search-form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
      }

      .search-bar {
        width: min(500px, 100%);
        margin: 0 auto;
      }

      .options {
        width: min(500px, 100%);
        margin: 0 auto;
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit, OnDestroy {
  @Input() isCollectorLogged = true;

  @Output() searchEvent = new EventEmitter<Search>();

  searchGroup!: FormGroup;

  optionsFormGroup!: FormGroup;

  subscription = new Subscription();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.searchGroup = this.fb.group({
      value: [""],
    });

    if (this.isCollectorLogged) {
      this.optionsFormGroup = this.fb.group({
        includePrivateCollections: [false],
        // collezioni in cui partecipo
        includeSharedCollections: [false],
      });
      this.searchGroup.addControl("options", this.optionsFormGroup);
    }

    const initialSearchValue: Search = {
      value: "",
      options: {
        includePrivateCollections: false,
        includeSharedCollections: false,
      }
    }

    this.subscription = this.searchGroup.valueChanges
      .pipe(
        startWith(this.isCollectorLogged ? initialSearchValue : {value: ""}),
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe((searchValue) => {
        this.searchEvent.emit(searchValue);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
