import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { initialState } from 'src/app/shared/mocks/test-mocks';
import { Lang } from 'src/app/shared/models/lang';
import { CreateProductModalModule } from 'src/app/shared/modules/create-product-modal/create-product-modal.module';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { HeaderHarness } from 'src/app/shared/modules/header/header.harness';
import { ProductService } from 'src/app/shared/services/product.service';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelector from 'src/app/shared/store/product/product.selectors';

import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';

@Component({
  template: '<tk-header></tk-header>'
})
class TestComponent {}

describe('Header', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: HeaderComponent;
  let harness: HeaderHarness;
  let store: MockStore;

  const mockProductService = {
    createProduct: jasmine
      .createSpy('createProduct')
      .and.returnValue(of({ message: 'test-message' }))
  };

  afterEach(() => {
    mockProductService.createProduct.calls.reset();
  });

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockComponent(SearchComponent),
        MockComponent(LangSelectorComponent),
        TestComponent
      ],
      imports: [
        CreateProductModalModule,
        MatButtonModule,
        MatIconModule,
        MatSnackBarModule,
        MatToolbarModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'products', component: TestComponent },
          { path: 'dashboard', component: TestComponent }
        ])
      ],
      providers: [
        provideMockStore({ initialState }),
        MockProvider(LANGUAGES_TOKEN),
        MockProvider(ProductService, mockProductService)
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.directive(HeaderComponent))
      .componentInstance;

    const loader = TestbedHarnessEnvironment.loader(fixture);
    harness = await loader.getHarness(HeaderHarness);

    store = TestBed.inject(MockStore);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  describe('Navbar', () => {
    const selectedClass = '.navbar-item-selected';

    it('should render navbar', () => {
      const navbar = fixture.debugElement.query(By.css('.navbar'));
      expect(navbar).toBeTruthy();
    });

    it('should render all the nav buttons', async () => {
      const navButtons = await harness.findAllNavButtons();
      expect(navButtons.length).toEqual(2);
      expect(navButtons[0]).toEqual('Products');
    });

    it('should change selected link on click', async () => {
      await harness.clickNavButton('Dashboard');
      const productBtn = fixture.debugElement.query(By.css(selectedClass));
      expect(productBtn.nativeElement.innerText).toEqual('Dashboard');

      await harness.clickNavButton('Products');
      const productsBtn = fixture.debugElement.query(By.css(selectedClass));
      expect(productsBtn.nativeElement.innerText).toEqual('Products');
    });
  });

  describe('Toolbar', () => {
    let search: SearchComponent;
    let langSelector: LangSelectorComponent;

    beforeEach(async () => {
      await harness.clickNavButton('Products');
      search = fixture.debugElement.query(By.directive(SearchComponent))
        .componentInstance;
      langSelector = fixture.debugElement.query(
        By.directive(LangSelectorComponent)
      ).componentInstance;
    });

    it('should render toolbar', () => {
      const toolbar = fixture.debugElement.query(By.css('.toolbar'));
      expect(toolbar).toBeTruthy();
    });

    it('should pass correct props to search component', async () => {
      expect(search.search).toEqual('');
      expect(search.options).toEqual(['product1', 'product2']);

      const testSearch = 'test-search';
      store.overrideSelector(ProductSelector.search, testSearch);
      store.refreshState();
      fixture.detectChanges();

      expect(search.search).toEqual(testSearch);
    });

    it('should listen for value changes on search component', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      const testVal = 'product1';
      search.valueChange.emit(testVal);
      expect(store.dispatch).toHaveBeenCalledWith(
        searchProductAction({ search: testVal })
      );
    });

    it('should render language selector component', () => {
      expect(langSelector).toBeTruthy();
    });

    it('should pass correct props to language selector component', async () => {
      expect(langSelector.lang).toEqual('ru');
    });

    it('should listen for language changes on language selector component', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      langSelector.langChanged.emit(Lang.en);
      expect(store.dispatch).toHaveBeenCalledWith(
        LangActions.change({ lang: Lang.en })
      );
    });
  });

  describe('Create Product Modal', () => {
    const validInputs = {
      name: 'test-name',
      picture:
        'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg',
      description: 'test-description-test-description'
    };

    it('should open create product modal on create product btn click', async () => {
      await harness.clickCreateProductBtn();

      expect(await harness.createProductModal()).toBeTruthy();
    });

    it('should not call product service create-product method on dialog close', async () => {
      await harness.clickCreateProductBtn();
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);
      await createProductModal.cancelBtnClick();

      expect(mockProductService.createProduct).toHaveBeenCalledTimes(0);
    });

    it('should call product service create-product method on create product with expected params', async () => {
      await harness.clickCreateProductBtn();
      spyOn(component, 'openSnackBar').and.callFake(() => {});
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);

      await createProductModal.createBtnClick();
      expect(mockProductService.createProduct).toHaveBeenCalledOnceWith(
        validInputs,
        initialState.lang
      );
    });

    it('should call openSnackbar with expected params on create product', async () => {
      await harness.clickCreateProductBtn();
      spyOn(component, 'openSnackBar').and.callFake(() => {});
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);

      await createProductModal.createBtnClick();
      expect(component.openSnackBar).toHaveBeenCalledOnceWith('test-message');
    });
  });
});
