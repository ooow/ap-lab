import { PieChartComponent } from 'src/app/dashboard/components/pie-chart/pie-chart.component';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PieChartDataType } from 'src/app/dashboard/components/pie-chart/pie-chart.types';

declare var google: any;

const mockPieChartData: PieChartDataType = {
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

describe('Pie Chart', () => {
  let component: PieChartComponent;
  let fixture: ComponentFixture<PieChartComponent>;
  let dom: HTMLElement;
  const drawSpy = jasmine.createSpy('draw');
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PieChartComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(PieChartComponent);
    component = fixture.componentInstance;
    component.chartData = mockPieChartData;
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
        PieChart: jasmine.createSpy().and.returnValue({ draw: drawSpy })
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
    expect(component.drawChart).toHaveBeenCalledOnceWith(mockPieChartData);
  });

  it('should call google draw methods on drawChart call from setOnLoadCallback', () => {
    component.ngOnChanges();
    expect(google.visualization.arrayToDataTable).toHaveBeenCalled();
    expect(drawSpy).toHaveBeenCalledOnceWith('test-data', mockConfigs);
  });
});
