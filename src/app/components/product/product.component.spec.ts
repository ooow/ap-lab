import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { getProducts } from '../../mocks/products';
import { Lang } from '../../models/lang';
import { Product } from '../../models/product';
import { ProductComponent } from './product.component';
import { ProductHarness } from './product.harness';

@Component({
  selector: 'tk-test',
  template: '<tk-product [product]="product"></tk-product>'
})
class TestComponent {
  product: Product;
}

describe('AppComponent => ProductComponent', () => {
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

  it('should show product name', async () => {
    const productCom = await loader.getHarness(ProductHarness);

    expect(await productCom.titleText()).toBe(product.name);
  });

  it('should show product image', async () => {
    const productCom = await loader.getHarness(ProductHarness);

    expect(await productCom.imgAlt()).toBe(product.name);
    expect(await productCom.imgSrc()).toBe(product.picture);
  });

  it('should show product description', async () => {
    const productCom = await loader.getHarness(ProductHarness);

    expect(await productCom.description()).toBe(product.description);
  });
});
