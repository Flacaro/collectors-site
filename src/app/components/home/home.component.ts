import { HttpClient } from "@angular/common/http";
import { Component, Input, OnInit } from "@angular/core";
import { Collection } from "src/app/models/collection";
import { HomeService } from "src/app/services/home.service";
import { LoggedCollectorService } from "src/app/services/logged-collector.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  headers!: string[];

  constructor(private homeService: HomeService) {}

  // private API_URL = CONSTANTS.API_URL;

  ngOnInit(): void {}

  collection: Collection | undefined;

  // showCollections(): void {
  //   this.homeService.getCollections().subscribe((data: Collection) => {
  //     this.collection = data;
  //   });
}
// @Input() collection!: Collection;

// getCollection(): void {
//   this.homeService.getCollection().subscribe((data: Collection) => {
//     this.collection = data;
//   }

// );
