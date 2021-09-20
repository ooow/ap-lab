import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { By } from '@angular/platform-browser';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { HeaderComponent } from 'src/app/shared/modules/header/header.component';
import { HeaderHarness } from 'src/app/shared/modules/header/header.harness';
import { initialState } from 'src/app/test-utils/test-mocks';
import { MockProvider } from 'ng-mocks';

import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { queryByCss } from 'src/app/test-utils/test-helpers';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import { products } from 'src/app/products/store/product/product.selectors';
import { SearchComponent } from 'src/app/shared/components/search/search.component';
import { LangSelectorComponent } from 'src/app/shared/modules/header/components/lang-selector/lang-selector.component';
import { Lang } from 'src/app/shared/models/lang';

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
      declarations: [TestComponent],
      imports: [
        HeaderModule,
        RouterTestingModule.withRoutes([
          { path: '', component: TestComponent },
          { path: 'products', component: TestComponent }
        ]),
        NoopAnimationsModule
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
      const navbar = queryByCss(fixture, '.navbar').nativeElement;
      expect(navbar).toBeTruthy();
    });

    it('should render all the nav buttons', async () => {
      const navButtons = await harness.findAllNavButtons();
      expect(navButtons.length).toEqual(3);
      expect(navButtons[0]).toEqual('Home');
    });

    it('should change selected link on click', async () => {
      const homeBtn = queryByCss(fixture, selectedClass);
      expect(homeBtn.nativeElement.innerText).toEqual('Home');
      await harness.clickNavButton('Products');
      const productBtn = queryByCss(fixture, selectedClass);
      expect(productBtn.nativeElement.innerText).toEqual('Products');
    });

    it('should make search field visible on products page', async () => {
      expect(
        fixture.debugElement.query(By.directive(SearchComponent))
      ).toBeNull();
      await harness.clickNavButton('Products');
      expect(
        fixture.debugElement.query(By.directive(SearchComponent))
          .componentInstance
      ).toBeTruthy();
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
      const toolbar = queryByCss(fixture, '.toolbar').nativeElement;
      expect(toolbar).toBeTruthy();
    });

    it('should pass correct props to search component', async () => {
      expect(search.options).toEqual(['product1', 'product2']);
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
