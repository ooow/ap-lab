import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { MatDialogModule } from '@angular/material/dialog';
import { RouterTestingModule } from '@angular/router/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsHarness } from 'src/app/products/products.harness';
import { ProductSearchPipe } from 'src/app/products/pipes/product-search.pipe';
import { ProductComponent } from 'src/app/products/components/product/product.component';
import { ProductTableComponent } from 'src/app/products/components/product-table/product-table.component';
import { ProductDetailsModalComponent } from 'src/app/products/components/product-details-modal/product-details-modal.component';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import { ProductService } from 'src/app/products/services/product.service';
import { initialState } from 'src/app/shared/mocks/test-mocks';

describe('Products', () => {
  @Component({
    template: '<tk-products></tk-products>'
  })
  class TestComponent {}

  let fixture: ComponentFixture<TestComponent>;
  let component: ProductsComponent;
  let harness: ProductsHarness;
  let store: MockStore;

  const mockProductService = {
    getProducts: jasmine.createSpy('getProducts').and.returnValue(of({}))
  };

  afterEach(() => {
    mockProductService.getProducts.calls.reset();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, RouterTestingModule],
      declarations: [
        TestComponent,
        ProductsComponent,
        MockPipe(ProductSearchPipe, (products) => products),
        MockComponent(ProductComponent),
        MockComponent(ProductTableComponent),
        MockComponent(ProductDetailsModalComponent)
      ],
      providers: [
        provideMockStore({ initialState }),
        MockProvider(ProductService, mockProductService)
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(ProductsComponent))
      .componentInstance;

    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(ProductsHarness);

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader when globalLoading is true', async () => {
    harness.setLoading(component, false);
    expect(await harness.isLoading()).toBeFalse();
    harness.setLoading(component, true);
    expect(await harness.isLoading()).toBeTrue();
  });

  it('should call productService.getProducts twice on creation with correct params', () => {
    expect(mockProductService.getProducts).toHaveBeenCalledTimes(2);
    expect(mockProductService.getProducts).toHaveBeenCalledWith(
      initialState.lang,
      initialState.product.pageIndex
    );
    expect(mockProductService.getProducts).toHaveBeenCalledWith(
      initialState.lang,
      0,
      5
    );
  });

  describe('Product Components', () => {
    let productCards: DebugElement[];

    beforeEach(() => {
      productCards = fixture.debugElement.queryAll(
        By.directive(ProductComponent)
      );
    });

    it('should render all the product cards', () => {
      expect(productCards.length).toEqual(2);
    });

    it('should pass product prop', () => {
      const firstCard = productCards[0].componentInstance;
      const expectedVal = initialState.product.topProducts[0];
      expect(firstCard.product).toEqual(expectedVal);
    });

    it('should open open product details modal on click', () => {
      const spy = spyOn(component, 'productDetails');
      expect(spy).toHaveBeenCalledTimes(0);
      const [firstCard] = productCards;
      firstCard.triggerEventHandler('click', null);
      const expectedArgs = initialState.product.products[0];
      expect(spy).toHaveBeenCalledOnceWith(expectedArgs);
    });

    describe('Product Table', () => {
      let productTable: ProductTableComponent;

      beforeEach(() => {
        productTable = fixture.debugElement.query(
          By.directive(ProductTableComponent)
        ).componentInstance;
      });

      it('should render product table', () => {
        expect(productTable).toBeTruthy();
      });

      it('should pass correct props to product table', () => {
        component.loading$.next(false);
        const {
          products,
          pageIndex,
          search,
          totalNumber
        } = initialState.product;
        expect(productTable.loading).toEqual(false);
        expect(productTable.products).toEqual(products);
        expect(productTable.pageIndex).toEqual(pageIndex);
        expect(productTable.search).toEqual(search);
        expect(productTable.totalNumber).toEqual(totalNumber);
      });

      it('should listen to page changes', () => {
        spyOn(store, 'dispatch').and.callFake(() => {});
        expect(store.dispatch).toHaveBeenCalledTimes(0);
        const pageIndex = 666;
        productTable.pageChange.emit(pageIndex);
        expect(store.dispatch).toHaveBeenCalledOnceWith(
          ProductActions.changePage({ pageIndex })
        );
      });
    });
  });
});
