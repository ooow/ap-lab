import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';

import { ProductComponent } from 'src/app/products/components/product/product.component';
import { ProductHarness } from 'src/app/products/components/product/product.harness';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';

import { getProducts } from '../../mocks/products';

@Component({
  selector: 'tk-test',
  template: '<tk-product [product]="product"></tk-product>'
})
class TestComponent {
  product: Product;
}

describe('AppModule => ProductComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;
  const [product] = getProducts(Lang.en);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatCardModule],
      declarations: [ProductComponent, TestComponent]
    })
      .overrideComponent(ProductComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
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
    const harness = await loader.getHarness(ProductHarness);
    const img = await harness.img();

    expect(await img.getProperty('alt')).toBe(product.name);
    expect(await img.getProperty('src')).toBe(product.picture);
    expect(await harness.titleText()).toBe(product.name);
    expect(await harness.description()).toBe(product.description);
  });
});
