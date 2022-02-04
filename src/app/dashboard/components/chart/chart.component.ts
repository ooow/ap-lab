import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  ViewChild
} from '@angular/core';
import {
  ChartConfigsType,
  ChartDataType,
  ChartType
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
  @Input() chartType: ChartType;
  @Output() selected:EventEmitter<any> = new EventEmitter<any>();


  drawChart(chartData: ChartDataType): void {
    const data = google.visualization.arrayToDataTable([
      chartData.fieldNames,
      ...chartData.data
    ]);

    const chart = new google.visualization[this.chartType](
      this.chart.nativeElement
    );

    const selectHandler = () =>{
      const selectedSectionIndex = chart.getSelection()[0].row;
      const selectedCountry = chartData.data[selectedSectionIndex][0]
      this.selected.emit({'location':selectedCountry})
    }

    chart.draw(data, this.chartConfigs);
    google.visualization.events.addListener(chart,'select',selectHandler)
  }

  ngOnChanges(): void {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(() => this.drawChart(this.chartData));
  }
}
