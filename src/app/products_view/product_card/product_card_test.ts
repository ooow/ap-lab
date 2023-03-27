import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';
import {ChangeDetectionStrategy, Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {MatCardModule} from '@angular/material/card';

import {ProductCard} from 'src/app/products_view/product_card/product_card';
import {ProductCardHarness} from 'src/app/products_view/product_card/testing/product_card_harness';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';

import {getProducts} from '../mock/products';

@Component({
  selector: 'tk-test',
  template: '<tk-product-card [product]="product"></tk-product-card>',
})
class TestComponent {
  product: Product;
}

describe('ProductCard', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;
  const [product] = getProducts(Language.en);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [MatCardModule], declarations: [ProductCard, TestComponent],
      })
      .overrideComponent(ProductCard, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default,
        },
      })
      .compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.componentInstance;

    component.product = product;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should render component appropriately', async () => {
    const harness = await loader.getHarness(ProductCardHarness);
    const img = await harness.img();

    expect(await img.getProperty('alt')).toBe(product.name);
    expect(await img.getProperty('src')).toBe(product.picture);
    expect(await harness.titleText()).toBe(product.name);
    expect(await harness.description()).toBe(product.description);
  });
});
