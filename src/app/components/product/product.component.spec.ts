import { ChangeDetectionStrategy, DebugElement, NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { getProducts } from '../../mocks/products';
import { Lang } from '../../models/lang';
import { ProductComponent } from './product.component';

describe('AppComponent => ProductComponent', () => {
  let fixture: ComponentFixture<ProductComponent>;
  let component: ProductComponent;
  const [product] = getProducts(Lang.en);

  class Select {
    static get title(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-product-card-title"]'));
    }

    static get image(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-product-card-image"]'));
    }

    static get description(): DebugElement {
      return fixture.debugElement.query(By.css('[data-role="tk-product-card-desc"]'));
    }
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .overrideComponent(ProductComponent, {
        set: {
          changeDetection: ChangeDetectionStrategy.Default
        }
      })
      .compileComponents();

    fixture = TestBed.createComponent(ProductComponent);
    component = fixture.componentInstance;

    component.product = product;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should show product name', () => {
    expect(Select.title.nativeElement.innerText).toBe(product.name);
  });

  it('should show product image', () => {
    const imageProps = Select.image.properties;
    expect(imageProps.src).toBe(product.picture);
    expect(imageProps.alt).toBe(product.name);
  });

  it('should show product description', () => {
    expect(Select.description.nativeElement.innerText).toBe(product.description);
  });
});
