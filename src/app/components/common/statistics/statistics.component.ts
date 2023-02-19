import { Component, Input, OnChanges, SimpleChanges } from "@angular/core";
import { ChartConfiguration, ChartData, ChartType } from "chart.js";
import { Statistics } from "src/app/models/statistics";

interface ChartDataOf {
  collections: {
    total: number;
    groupBy: ChartData<"bar">[];
  };
  disks: {
    total: number;
    groupBy: ChartData<"bar">[];
  };
}

@Component({
  selector: "app-statistics",
  templateUrl: "./statistics.component.html",
  styleUrls: ["./statistics.component.scss"],
})
export class StatisticsComponent implements OnChanges {
  
  @Input() statistics!: Statistics.Statistics;

  @Input() pageTitle: string = "Statistics";

  chartData: ChartDataOf | undefined;

  readonly barChartType: ChartType = "bar";

  readonly barChartOptions: ChartConfiguration["options"] = {
    responsive: true,
    scales: {
      x: {},
      y: {
        min: 10,
      },
    },
    indexAxis: "y",
    plugins: {
      legend: {
        display: true,
      }
    },
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['statistics']) {
      this.chartData = this.mapToChartData(this.statistics);
    }
  }

  private mapToChartData(statistics: Statistics.Statistics): ChartDataOf {
    return {
      collections: {
        total: statistics.collectionStatistics.totalCollections,
        groupBy: [
          {
            labels: ["Collections by type"],
            datasets: statistics.collectionStatistics.collectionsByType.map(
              (type) => {
                return { data: [type.count], label: type.field };
              }
            ),
          },
        ],
      },
      disks: {
        total: statistics.diskStatistics.totalDisks,
        groupBy: [
          {
            labels: ["Disks by artists"],
            datasets: statistics.diskStatistics.diskCountByArtist.map(
              (byArtist) => {
                return { data: [byArtist.count], label: byArtist.field };
              }
            ),
          },
          {
            labels: ["Disks by genre"],
            datasets: statistics.diskStatistics.diskCountByGenre.map(
              (byGenre) => {
                return { data: [byGenre.count], label: byGenre.field };
              }
            ),
          },
        ],
      },
    };
  }
}
