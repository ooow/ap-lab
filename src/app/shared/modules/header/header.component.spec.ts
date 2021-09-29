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
import { MatButtonModule } from '@angular/material/button';

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
        MockComponent(SearchComponent),
        MockComponent(LangSelectorComponent)
      ],
      imports: [
        MatButtonModule,
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
        ProductActions.search({ search: testVal })
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
