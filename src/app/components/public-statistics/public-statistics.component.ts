import { Component, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { StatisticsService } from 'src/app/services/statistics.service';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';

interface ChartDataOf {
  collections: {
    total: number,
    groupBy: ChartData<'bar'>[]
  },
  disks: {
    total: number,
    groupBy:  ChartData<'bar'>[]
  }
}

@Component({
  selector: 'app-public-statistics',
  templateUrl: './public-statistics.component.html',
  styleUrls: ['./public-statistics.component.scss']
})
export class PublicStatisticsComponent implements OnInit {

  statistics$!: Observable<ChartDataOf>;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 10
      }
    },
    indexAxis: 'y',
    plugins: {
      legend: {
        display: true,
      },
      // datalabels: {
      //   anchor: 'end',
      //   align: 'end'
      // }
    }
  };

  public barChartType: ChartType = 'bar';


  constructor(private statisticsService: StatisticsService) { }

  ngOnInit(): void {
    this.statistics$ = this.statisticsService.getPublicStatistics().pipe(
      map(statistics => {
        return {
          collections: {
            total: statistics.collectionStatistics.totalCollections,
            groupBy: [{
              labels: ["Collections by type"],
              datasets: statistics.collectionStatistics.collectionsByType.map(type => {
                return { data: [type.count], label: type.field }
              })
            }]
          },
          disks:{
            total: statistics.diskStatistics.totalDisks,
            groupBy: [
              {
                labels: ["Disks by artists"],
                datasets: statistics.diskStatistics.diskCountByArtist.map(byArtist => {
                  return { data: [byArtist.count], label: byArtist.field }
                })
              },
              {
                labels: ["Disks by genre"],
                datasets: statistics.diskStatistics.diskCountByGenre.map(byGenre => {
                  return { data: [byGenre.count], label: byGenre.field }
                })
              }
            ]
          } 
        }
      })
    );
  }

}
