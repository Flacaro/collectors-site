import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: "app-search-bar",
  template: `
    <mat-form-field class= "search-bar"appearance="outline">
      <mat-label>Search</mat-label>
      <input matInput type="search" placeholder="Cerca qualcosa..." [formControl]="searchControl" />
      <mat-icon matSuffix>search</mat-icon>
    </mat-form-field>
  `,
  styles: [
    `
      :host {
        display: flex;
        justify-content: center;
      }
      .search-bar {
        min-width: 30%;
      }
    `,
  ],
})
export class SearchBarComponent implements OnInit {
  search: String = "";

  searchControl: FormControl = new FormControl(['']);

  constructor() {}

  ngOnInit(): void {
    this.searchControl.valueChanges.subscribe();
  }

}
