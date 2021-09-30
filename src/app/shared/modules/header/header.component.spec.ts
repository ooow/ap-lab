import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { HeaderHarness } from 'src/app/shared/modules/header/header.harness';
import { initialState } from 'src/app/shared/mocks/test-mocks';
import { MockComponent, MockProvider } from 'ng-mocks';

import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import * as ProductSelector from 'src/app/products/store/product/product.selectors';
import { products } from 'src/app/products/store/product/product.selectors';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import { SearchComponent } from 'src/app/shared/modules/header/components/search/search.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { Lang } from 'src/app/shared/models/lang';
import { SearchHarness } from 'src/app/shared/modules/header/components/search/search.harness';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';

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
        TestComponent,
        HeaderComponent,
        SearchComponent,
        MockComponent(LangSelectorComponent)
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
      console.log(navButtons);
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
        ProductActions.search({ search: testVal })
      );
    });

    it('should update product store search value on search select change', async () => {
      await harness.clickNavButton('Dashboard');
      spyOn(store, 'dispatch').and.callFake(() => {});
      const testVal = 'product2';

      await search.setSelectorValue(testVal);
      expect(store.dispatch).toHaveBeenCalledWith(
        ProductActions.search({ search: testVal })
      );
    });

    it('should reset product store search field on clear search input', async () => {
      spyOn(store, 'dispatch').and.callFake(() => {});

      await search.getClearBtn().then((button) => button.click());

      expect(store.dispatch).toHaveBeenCalledWith(
        ProductActions.search({ search: '' })
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
});
