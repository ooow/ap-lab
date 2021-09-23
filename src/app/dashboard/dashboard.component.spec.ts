import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import {
  initialState,
  mockProductResponse
} from 'src/app/test-utils/test-mocks';
import { ProductService } from 'src/app/products/services/product.service';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PieChartProductDataPipe } from 'src/app/dashboard/components/pipes/pie-chart-product-data.pipe';
import { PieChartDataType } from 'src/app/dashboard/components/pie-chart/pie-chart.types';
import { PieChartComponent } from 'src/app/dashboard/components/pie-chart/pie-chart.component';
import { DashboardHarness } from 'src/app/dashboard/dashboard.harness';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import { AppState } from 'src/app/shared/models/app-state';

describe('Dashboard', () => {
  @Component({
    template: '<tk-dashboard></tk-dashboard>'
  })
  class TestComponent {}

  let fixture: ComponentFixture<TestComponent>;
  let component: DashboardComponent;
  let harness: DashboardHarness;
  let store: MockStore<AppState>;

  const mockProductService = {
    getProducts: jasmine
      .createSpy('getProducts')
      .and.returnValue(of(mockProductResponse))
  };

  const mockPieChartProductDataPipeReturn: PieChartDataType = {
    fieldNames: ['Task', 'Hours per Day'],
    data: [
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7]
    ]
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, RouterTestingModule],
      declarations: [
        TestComponent,
        DashboardComponent,
        MockPipe(
          PieChartProductDataPipe,
          (products) => mockPieChartProductDataPipeReturn
        ),
        MockComponent(PieChartComponent)
      ],
      providers: [
        provideMockStore({ initialState }),
        MockProvider(ProductService, mockProductService)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    store = TestBed.inject(MockStore);
    spyOn(store, 'dispatch');

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(DashboardComponent))
      .componentInstance;

    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(DashboardHarness);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader when loading is true', async () => {
    expect(await harness.isLoading()).toBeFalse();
    component.loading$.next(true);
    expect(await harness.isLoading()).toBeTrue();
  });

  it('should display page title', async () => {
    const receivedTitle = await harness.pageTitle();
    const expectedTitle = 'Product Info Dashboard';

    expect(receivedTitle).toBe(expectedTitle);
  });

  it('should display text when product not selected', async () => {
    const pageText = await harness.pageText();
    expect(pageText).not.toBeNull();
    expect(
      fixture.debugElement.query(By.directive(PieChartComponent))
    ).toBeNull();
  });

  it('should dispatch products retrieval on component creation', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.retrieveProducts(mockProductResponse)
    );
  });

  describe('Pie Chart', () => {
    const targetProduct = initialState.product.products[0];
    let pieChartComponent: PieChartComponent;

    beforeEach(() => {
      store.overrideSelector(ProductSelectors.search, targetProduct.name);
      store.refreshState();
      fixture.detectChanges();

      pieChartComponent = fixture.debugElement.query(
        By.directive(PieChartComponent)
      ).componentInstance;
    });

    it('should render pie chart when product selected', () => {
      expect(pieChartComponent).toBeTruthy();
    });

    it('should pass correct props to pie chart', () => {
      const chartConfigs = { config: 'test-config' };
      component.chartConfigs = chartConfigs;
      fixture.detectChanges();

      expect(pieChartComponent.chartData).toEqual(
        mockPieChartProductDataPipeReturn
      );
      expect(pieChartComponent.chartConfigs).toEqual(chartConfigs);
    });

    it('should pass product name as a title in chartConfig', () => {
      expect(pieChartComponent.chartConfigs.title).toContain(
        targetProduct.name
      );
    });
  });
});
