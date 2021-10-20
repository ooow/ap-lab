import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { MockComponent, MockProvider } from 'ng-mocks';
import { of } from 'rxjs';

import { initialState } from 'src/app/shared/mocks/test-mocks';
import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';
import { SearchComponent } from 'src/app/shared/modules/header/components/search/search.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { Lang } from 'src/app/shared/models/lang';
import { SearchHarness } from 'src/app/shared/modules/header/components/search/search.harness';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import * as imageUrlValidator from 'src/app/shared/modules/create-product-modal/validators/image-url.validator';
import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { HeaderHarness } from 'src/app/shared/modules/header/header.harness';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelector from 'src/app/shared/store/product/product.selectors';
import { createProductAction } from 'src/app/shared/store/stored-product/actions/create-product.actions';

@Component({
  template: '<tk-header></tk-header>'
})
class TestComponent {}

describe('Header', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: HeaderComponent;
  let harness: HeaderHarness;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [
        HeaderComponent,
        MockComponent(LangSelectorComponent),
        SearchComponent,
        TestComponent
      ],
      imports: [
        HeaderModule,
        NoopAnimationsModule,
        RouterTestingModule.withRoutes([
          { path: 'products', component: TestComponent },
          { path: 'dashboard', component: TestComponent }
        ])
      ],
      providers: [
        provideMockStore({ initialState }),
        MockProvider(LANGUAGES_TOKEN)
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

    spyOn(window, 'confirm').and.returnValue(true);
    spyOn(window, 'onbeforeunload');
    spyOn(imageUrlValidator, 'imageUrlValidator').and.returnValue(of(null));
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
    let search: SearchHarness;
    let langSelector: LangSelectorComponent;

    beforeEach(async () => {
      await harness.clickNavButton('Products');
      search = await harness.productSearch();
      langSelector = fixture.debugElement.query(
        By.directive(LangSelectorComponent)
      ).componentInstance;
    });

    it('should render toolbar', () => {
      const toolbar = fixture.debugElement.query(By.css('.toolbar'));
      expect(toolbar).toBeTruthy();
    });

    it('should render product search input on products page', async () => {
      expect(await search.getInput()).toBeTruthy();
      expect(await search.getClearBtn()).toBeTruthy();
    });

    it('should render product search select on dashboard page', async () => {
      await harness.clickNavButton('Dashboard');

      expect(await search.getSelector()).toBeTruthy();
    });

    it('should pass correct props to search input', async () => {
      const inputOptions = await search.getInputOptions();
      await fixture.whenStable();

      expect(await search.getInputValue()).toEqual('');
      expect(await inputOptions[0].getText()).toEqual('product1');
      expect(await inputOptions[1].getText()).toEqual('product2');

      const testSearch = 'product1';
      store.overrideSelector(ProductSelector.search, testSearch);
      store.refreshState();
      fixture.detectChanges();

      expect(await search.getInputValue()).toEqual(testSearch);
    });

    it('should pass correct props to search select', async () => {
      await harness.clickNavButton('Dashboard');
      const selectOptions = await search.getSelectorOptions();
      await fixture.whenStable();

      expect(await search.getSelectorValue()).toEqual('');
      expect(await selectOptions[0].getText()).toEqual('product1');
      expect(await selectOptions[1].getText()).toEqual('product2');

      const testSearch = 'product2';
      store.overrideSelector(ProductSelector.search, testSearch);
      store.refreshState();
      fixture.detectChanges();

      expect(await search.getSelectorValue()).toEqual(testSearch);
    });

    it('should update product store search value on search input change', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});
      const testVal = 'product1';

      await search.setInputValue(testVal);
      expect(store.dispatch).toHaveBeenCalledWith(
        searchProductAction({ search: testVal })
      );
    });

    it('should update product store search value on search select change', async () => {
      await harness.clickNavButton('Dashboard');
      spyOn(store, 'dispatch').and.callFake(() => {});
      const testVal = 'product2';

      await search.setSelectorValue(testVal);
      expect(store.dispatch).toHaveBeenCalledWith(
        searchProductAction({ search: testVal })
      );
    });

    it('should reset product store search field on clear search input', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});

      await search.clearSearch();

      expect(store.dispatch).toHaveBeenCalledWith(
        searchProductAction({ search: '' })
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

    it('should not create product on dialog close', async () => {
      spyOn(store, 'dispatch').and.callThrough();
      await harness.clickCreateProductBtn();
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);
      await createProductModal.cancelBtnClick();

      expect(store.dispatch).not.toHaveBeenCalledWith(
        createProductAction({
          productData: validInputs,
          lang: initialState.lang
        })
      );
    });

    it('should call product service stored-product method on create product with expected params', async () => {
      spyOn(component, 'openSnackBar');
      spyOn(store, 'dispatch');
      await harness.clickCreateProductBtn();
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);

      await createProductModal.createBtnClick();
      expect(store.dispatch).toHaveBeenCalledOnceWith(
        createProductAction({
          productData: validInputs,
          lang: initialState.lang
        })
      );
    });

    it('should call openSnackbar with expected params on create product', async () => {
      spyOn(component, 'openSnackBar');
      const testMessage = 'test-message';
      store.setState({
        ...initialState,
        createProduct: { isLoading: true, message: testMessage, error: null }
      });

      await harness.clickCreateProductBtn();
      const createProductModal = await harness.createProductModal();
      await createProductModal.setFormValues(validInputs);
      await createProductModal.createBtnClick();

      expect(component.openSnackBar).toHaveBeenCalledOnceWith(testMessage);

      store.setState({
        ...initialState,
        createProduct: { isLoading: false, message: testMessage, error: null }
      });

      expect(component.openSnackBar).toHaveBeenCalledTimes(2);
      expect(component.openSnackBar).toHaveBeenCalledWith(testMessage, 5000);
    });
  });
});
