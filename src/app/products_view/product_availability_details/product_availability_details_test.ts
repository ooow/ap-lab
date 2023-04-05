/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { ProductAvailabilityDetails } from './product_availability_details';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ProductAvailabilityDetailsHarness } from './testing/product_availability_details.harness';
import { MatSelectHarness } from '@angular/material/select/testing';
import { Language } from '../../shared/component/header/lang-selector/lang-selector.component';
import { getProducts } from '../mock/products';

@Component({
  selector: 'tk-test',
  template:
    '<tk-product-availability-details [productQuantityInfo]="productQuantityInfo"></tk-product-availability-details>',
})
class TestComponent {
  productQuantityInfo = getProducts(Language.en).length
    ? getProducts(Language.en)[0].counts
    : [];
}

describe('ProductAvailabilityDetails', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [TestComponent, ProductAvailabilityDetails],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });

  it('should have countries info', async () => {
    expect(component.productQuantityInfo.length).toBe(
      getProducts(Language.en)[0]?.counts?.length || 0
    );
  });

  it('country should be updated with default value', async () => {
    const dafaultCountryInfo = component.productQuantityInfo[0];
    fixture.detectChanges();
    await fixture.whenStable();
    const selectHarness = await loader.getHarness(MatSelectHarness);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(await selectHarness.getValueText()).toBe(
      dafaultCountryInfo?.location
    );
  });

  it('price should be updated with default value', async () => {
    const dafaultCountryInfo = component.productQuantityInfo[0];
    fixture.detectChanges();
    await fixture.whenStable();
    const harness = await loader.getHarness(ProductAvailabilityDetailsHarness);
    expect(await harness.getPriceValue()).toBe(
      dafaultCountryInfo?.price?.toString()
    );
  });

  it('country should be updated with default value', async () => {
    const dafaultCountryInfo = component.productQuantityInfo[0];
    fixture.detectChanges();
    await fixture.whenStable();
    const harness = await loader.getHarness(ProductAvailabilityDetailsHarness);
    expect(await harness.getQuantityAvailableValue()).toBe(
      dafaultCountryInfo?.quantityAvailable?.toString()
    );
  });
});
