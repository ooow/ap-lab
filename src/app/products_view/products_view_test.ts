import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {Component, DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatDialogModule} from '@angular/material/dialog';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {RouterTestingModule} from '@angular/router/testing';
import {MockStore, provideMockStore} from '@ngrx/store/testing';
import {MockComponent, MockPipe, MockProvider} from 'ng-mocks';
import {of} from 'rxjs';

import {ProductDetailsDialog} from 'src/app/products_view/product_details_dialog/product_details_dialog';
import {ProductTableComponent} from 'src/app/products_view/product_table/product_table';
import {ProductCard} from 'src/app/products_view/product_card/product_card';
import {ProductSearchPipe} from 'src/app/products_view/pipe/product_search_pipe';
import {ProductsView} from 'src/app/products_view/products_view';
import {ProductsViewHarness} from 'src/app/products_view/testing/products_view.harness';
import {initialState} from 'src/app/shared/mock/test_mocks';
import {ProductService} from 'src/app/shared/service/product_service';
import {changePageAction} from 'src/app/store/product/actions/change-page.action';
import {getProductsAction} from 'src/app/store/product/actions/get-products.actions';
import {getTopProductsAction} from 'src/app/store/top-products/actions/get-top-products.action';
import {isLoading} from 'src/app/store/top-products/top-products.selectors';
import {ProductDeleteDialog} from './product_delete_dialog/product_delete_dialog';

describe('ProductsView', () => {
  @Component({
    template: '<tk-products-view></tk-products-view>',
  })
  class TestComponent {}

  let fixture: ComponentFixture<TestComponent>;
  let component: ProductsView;
  let harness: ProductsViewHarness;
  let store: MockStore;

  const mockProductService = {
    getProducts: jasmine.createSpy('getProducts').and.returnValue(of({})),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports        : [
        NoopAnimationsModule, MatDialogModule, RouterTestingModule,
      ], declarations: [
        TestComponent,
        ProductsView,
        MockPipe(ProductSearchPipe, (products) => products),
        MockComponent(ProductCard),
        MockComponent(ProductTableComponent),
        MockComponent(ProductDetailsDialog),
        MockComponent(ProductDeleteDialog),
      ], providers   : [
        provideMockStore({initialState}),
        MockProvider(ProductService, mockProductService),
      ], schemas     : [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component =
      fixture.debugElement.query(By.directive(ProductsView)).componentInstance;

    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(ProductsViewHarness);

    store = TestBed.inject(MockStore);

    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should display loader when globalLoading is true', async () => {
    expect(await harness.isLoading()).toBeFalse();

    store.overrideSelector(isLoading, true);
    store.refreshState();
    fixture.detectChanges();

    expect(await harness.isLoading()).toBeTrue();
  });

  it('should get products and top product OnInit', () => {
    spyOn(store, 'dispatch').and.callFake(() => {});
    component.ngOnInit();

    expect(store.dispatch).toHaveBeenCalledTimes(3);
    expect(store.dispatch).toHaveBeenCalledWith(getProductsAction({
      lang: initialState.lang, pageIndex: initialState.product.pageIndex,
    }));
    expect(store.dispatch)
      .toHaveBeenCalledWith(getTopProductsAction({lang: initialState.lang}));
  });

  describe('Product Components', () => {
    let productCards: DebugElement[];

    beforeEach(() => {
      productCards = fixture.debugElement.queryAll(By.directive(ProductCard));
    });

    it('should render all the product cards', () => {
      expect(productCards.length).toEqual(2);
    });

    it('should pass product prop', () => {
      const firstCard = productCards[0].componentInstance;
      const expectedVal = initialState.topProducts.topProducts[0];
      expect(firstCard.product).toEqual(expectedVal);
    });

    it('should open open product details modal on click', () => {
      const spy = spyOn(component, 'showProductDetails');
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
          By.directive(ProductTableComponent)).componentInstance;
      });

      it('should render product table', () => {
        expect(productTable).toBeTruthy();
      });

      it('should pass correct props to product table', () => {
        const {
          products, pageIndex, search, totalNumber,
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
        expect(store.dispatch)
          .toHaveBeenCalledOnceWith(changePageAction({pageIndex}));
      });

      it('should listen to delete product events', () => {
        spyOn(component, 'showConfirmDeleteDialog').and.callFake(() => {});
        expect(component.showConfirmDeleteDialog).toHaveBeenCalledTimes(0);
        const productItem = initialState.product[0];
        productTable.deleteProduct.emit(productItem);
        expect(component.showConfirmDeleteDialog)
          .toHaveBeenCalledOnceWith(productItem);
      });
    });
  });
});
