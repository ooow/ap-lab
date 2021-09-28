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
} from 'src/app/shared/mocks/test-mocks';
import { ProductService } from 'src/app/products/services/product.service';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { ChartComponent } from 'src/app/dashboard/components/chart/chart.component';
import { DashboardHarness } from 'src/app/dashboard/dashboard.harness';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import { AppState } from 'src/app/shared/models/app-state';
import { BarChartProductDataPipe } from 'src/app/dashboard/pipes/bar-chart-product-data.pipe';

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

  const mockChartProductData = {
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
        MockPipe(PieChartProductDataPipe, () => mockChartProductData),
        MockPipe(BarChartProductDataPipe, () => mockChartProductData),
        MockComponent(ChartComponent)
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
    const charts = await harness.charts();

    expect(pageText).not.toBeNull();
    expect(charts.length).toBe(0);
  });

  it('should dispatch products retrieval on component creation', () => {
    expect(store.dispatch).toHaveBeenCalledWith(
      ProductActions.retrieveProducts(mockProductResponse)
    );
  });

  describe('Pie Chart', () => {
    const targetProduct = initialState.product.products[0];
    let pieChartComponent: ChartComponent;

    beforeEach(async () => {
      store.overrideSelector(ProductSelectors.search, targetProduct.name);
      store.refreshState();
      fixture.detectChanges();

      pieChartComponent = fixture.debugElement.queryAll(
        By.directive(ChartComponent)
      )[0].componentInstance;
    });

    it('should render pie chart when product selected', async () => {
      expect(pieChartComponent).toBeTruthy();
      expect(pieChartComponent.chartType).toEqual('PieChart');
    });

    it('should pass correct props to pie chart', () => {
      expect(pieChartComponent.chartData).toEqual(mockChartProductData);
      expect(pieChartComponent.chartConfigs).toEqual(component.pieChartConfigs);
    });

    it('should pass product name as a title in chartConfig', () => {
      expect(pieChartComponent.chartConfigs.title).toContain(
        targetProduct.name
      );
    });
  });

  describe('Bar Chart', () => {
    const targetProduct = initialState.product.products[0];
    let barChartComponent: ChartComponent;

    beforeEach(() => {
      store.overrideSelector(ProductSelectors.search, targetProduct.name);
      store.refreshState();
      fixture.detectChanges();

      barChartComponent = fixture.debugElement.queryAll(
        By.directive(ChartComponent)
      )[1].componentInstance;
    });

    it('should render bar chart when product selected', () => {
      expect(barChartComponent).toBeTruthy();
      expect(barChartComponent.chartType).toEqual('BarChart');
    });

    it('should pass correct props to bar chart', () => {
      expect(barChartComponent.chartData).toEqual(mockChartProductData);
      expect(barChartComponent.chartConfigs).toEqual(component.barChartConfigs);
    });

    it('should pass product name as a title in chartConfig', () => {
      expect(barChartComponent.chartConfigs.title).toContain(
        targetProduct.name
      );
    });
  });
});
