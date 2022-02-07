import { ChartComponent } from 'src/app/dashboard/components/chart/chart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChartType } from 'src/app/dashboard/components/chart/chart.types';

declare var google: any;

const mockChartData = {
  fieldNames: ['Task', 'Hours per Day'],
  data: [
    ['Work', 11],
    ['Eat', 2],
    ['Commute', 2],
    ['Watch TV', 2],
    ['Sleep', 7]
  ]
};
const mockConfigs = { configs: 'test-configs' };

describe('Chart', () => {
  let component: ChartComponent;
  let fixture: ComponentFixture<ChartComponent>;
  let dom: HTMLElement;
  const drawSpy = jasmine.createSpy('draw');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(ChartComponent);
    component = fixture.componentInstance;
    component.chartType = ChartType.PIE_CHART;
    component.chartData = mockChartData;
    component.chartConfigs = mockConfigs;
    dom = fixture.debugElement.componentInstance;
    // tslint:disable-next-line:no-string-literal
    window['google'] = {
      charts: {
        load: jasmine.createSpy('load'),
        setOnLoadCallback: jasmine
          .createSpy('setOnLoadCallback')
          .and.callFake((cb) => cb())
      },
      visualization: {
        arrayToDataTable: jasmine
          .createSpy('arrayToDataTable')
          .and.returnValue('test-data'),
        PieChart: jasmine.createSpy().and.returnValue({ draw: drawSpy }),
        BarChart: jasmine.createSpy().and.returnValue({ draw: drawSpy }),
        events:{
          addListener: jasmine
            .createSpy('addListener')
            .and.callThrough()
        }
      }
    };

    drawSpy.calls.reset();
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call google charts methods onChanges', () => {
    component.ngOnChanges();
    expect(google.charts.setOnLoadCallback).toHaveBeenCalled();
    expect(google.charts.load).toHaveBeenCalled();
  });

  it('should call drawChart method with data as argument', () => {
    spyOn(component, 'drawChart');
    component.ngOnChanges();
    expect(component.drawChart).toHaveBeenCalledOnceWith(mockChartData);
  });

  it('should call google draw methods on drawChart call from setOnLoadCallback', () => {
    component.ngOnChanges();
    expect(google.visualization.arrayToDataTable).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalledOnceWith('test-data', mockConfigs);
  });

  it('should instantiate right chart type', () => {
    component.ngOnChanges();
    expect(google.visualization.PieChart).toHaveBeenCalled();
    expect(google.visualization.BarChart).toHaveBeenCalledTimes(0);

    component.chartType = ChartType.BAR_CHART;
    component.ngOnChanges();
    expect(google.visualization.BarChart).toHaveBeenCalled();
  });
});
