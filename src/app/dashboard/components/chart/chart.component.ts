import {
  OnChanges,
  Component,
  ElementRef,
  Input,
  ViewChild
} from '@angular/core';
import {
  ChartConfigsType,
  ChartDataType
} from 'src/app/dashboard/components/chart/chart.types';

declare var google: any;

@Component({
  selector: 'tk-chart',
  templateUrl: './chart.component.html'
})
export class ChartComponent implements OnChanges {
  @ViewChild('chart') chart: ElementRef;
  @Input() chartData: ChartDataType;
  @Input() chartConfigs: ChartConfigsType;
  @Input() chartType: 'PieChart' | 'BarChart';

  drawChart(chartData: ChartDataType): void {
    const data = google.visualization.arrayToDataTable([
      chartData.fieldNames,
      ...chartData.data
    ]);

    const chart = new google.visualization[this.chartType](
      this.chart.nativeElement
    );

    chart.draw(data, this.chartConfigs);
  }

  ngOnChanges(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart(this.chartData));
  }
}
