import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {
  ChartConfigsType,
  ChartDataType
} from 'src/app/dashboard/components/pie-chart/pie-chart.types';
declare var google: any;

@Component({
  selector: 'tk-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
})
export class PieChartComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart: ElementRef;
  @Input() chartData: ChartDataType;
  @Input() chartConfigs: ChartConfigsType;

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      this.chartData.fieldNames,
      ...this.chartData.data
    ]);

    const chart = new google.visualization.PieChart(
      this.pieChart.nativeElement
    );

    chart.draw(data, this.chartConfigs);
  };

  ngAfterViewInit(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
