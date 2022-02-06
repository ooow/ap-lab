import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockPipe, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { MatButtonToggleGroupHarness, MatButtonToggleHarness } from '@angular/material/button-toggle/testing';

import { ProductDetailsModalComponent } from 'src/app/products/components/product-details-modal/product-details-modal.component';
import { ProductTableComponent } from 'src/app/products/components/product-table/product-table.component';
import { ProductSearchPipe } from 'src/app/products/pipes/product-search.pipe';
import { ProductsComponent } from 'src/app/products/products.component';
import { ProductsHarness } from 'src/app/products/products.harness';
import { initialState } from 'src/app/shared/mocks/test-mocks';
import { ProductService } from 'src/app/shared/services/product.service';
import { changePageAction } from 'src/app/shared/store/product/actions/change-page.action';
import { getProductsAction } from 'src/app/shared/store/product/actions/get-products.actions';
import { deleteProductAction } from 'src/app/shared/store/stored-product/actions/delete-product.actions';
import { getTopProductsAction } from 'src/app/shared/store/top-products/actions/get-top-products.action';
import { isLoading } from 'src/app/shared/store/top-products/top-products.selectors';
import { IfViewModeDirective } from '../shared/directives/if-view-mode.directive';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { viewModes } from './mocks/view-modes';
import { changeViewAction } from '../shared/store/products-view/products-view.actions';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';


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

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, MatDialogModule, RouterTestingModule, MatButtonToggleModule],
      declarations: [
        TestComponent,
        ProductsComponent,
        MockComponent(ProductTableComponent),
        MockComponent(ProductCardsComponent),
        MockComponent(ProductDetailsModalComponent),
        MockPipe(ProductSearchPipe, (products) => products),
        IfViewModeDirective
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
    expect(store.dispatch).toHaveBeenCalledWith(
      getProductsAction({
        lang: initialState.lang,
        pageIndex: initialState.product.pageIndex
      })
    );
    expect(store.dispatch).toHaveBeenCalledWith(
      getTopProductsAction({ lang: initialState.lang })
    );
  });

  describe('View mode selector', () => {
    let loader: HarnessLoader;
    let group: MatButtonToggleGroupHarness;

    beforeEach(async () => {
      loader = TestbedHarnessEnvironment.loader(fixture);
      group = await loader.getHarness(MatButtonToggleGroupHarness)
    })
    
    it('should render correct number of groups', async () => {
      const groups = await loader.getAllHarnesses(MatButtonToggleGroupHarness);
      expect(groups.length).toBe(1);
    });

    describe('Toggles', () => {
      let toggles: MatButtonToggleHarness[];
      
      beforeEach(async () => {
        toggles = await group.getToggles();
      })

      it('should render correct number of toggles', () => {
        expect(toggles.length).toBe(viewModes.length)
      });
  
      it('should render toggles with correct props', async () => {
        expect(await toggles[0].getText()).toBe(viewModes[0].icon);
        expect(await toggles[0].getAriaLabel()).toBe(viewModes[0].label);
      });

      it('should listen to view mode changes', async () => {
        spyOn(store, "dispatch").and.callFake(() => {})
        expect(store.dispatch).not.toHaveBeenCalled();
        await toggles[1].toggle();
        expect(store.dispatch).toHaveBeenCalledOnceWith(
          changeViewAction({ mode: viewModes[1].mode })
        )
      });
    });
  });

  describe('Product Cards Component', () => {
    let productCards: ProductCardsComponent;

    beforeEach(() => {
      store.setState({...initialState, productsView: 'cards'});
      fixture.detectChanges();

      productCards = fixture.debugElement.query(
        By.directive(ProductCardsComponent)
      ).componentInstance;
    });

    it('should pass products prop', () => {
      expect(productCards.products).toEqual(initialState.product.products);
    });

    it("should open product details modal", () => {
      const spy = spyOn(component, 'showProductDetails');
      const firstProduct = initialState.product.products[0];

      expect(spy).not.toHaveBeenCalled();
      productCards.productDetails.emit(firstProduct);
      expect(spy).toHaveBeenCalledOnceWith(firstProduct);
    })
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
        changePageAction({ pageIndex })
      );
    });

    it('should listen to delete product events', () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      expect(store.dispatch).toHaveBeenCalledTimes(0);
      const productItem = initialState.product[0];
      productTable.deleteProduct.emit(productItem);
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        deleteProductAction({ lang: initialState.lang, product: productItem })
      );
    });
  });
});
