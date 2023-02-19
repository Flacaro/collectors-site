import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { StatisticsService } from "src/app/services/statistics.service";
import { Statistics } from "src/app/models/statistics";

@Component({
  selector: "app-public-statistics",
  templateUrl: "./public-statistics.component.html",
  styleUrls: ["./public-statistics.component.scss"],
})
export class PublicStatisticsComponent implements OnInit {

  test$!: Observable<Statistics.Statistics>;

  constructor(private statisticsService: StatisticsService) {}

  ngOnInit(): void {
    this.test$ = this.statisticsService.getPublicStatistics();
  }
}
