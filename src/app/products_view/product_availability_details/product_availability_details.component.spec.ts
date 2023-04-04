/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement, NO_ERRORS_SCHEMA, Component } from '@angular/core';

import { ProductAvailabilityDetails } from './product_availability_details';
import { MatSelectModule } from '@angular/material/select';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { HarnessLoader } from '@angular/cdk/testing';
import { ProductAvailabilityDetailsHarness } from './product_availability_details.harness';
import { MatSelectHarness } from '@angular/material/select/testing';
import { Language } from '../../shared/component/header/lang-selector/lang-selector.component';
import { getProducts } from '../mock/products';

fdescribe('ProductAvailabilityDetails', () => {
  let fixture: ComponentFixture<ProductAvailabilityDetails>;
  let component: ProductAvailabilityDetails;
  let loader: HarnessLoader;

  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [MatSelectModule, NoopAnimationsModule],
      declarations: [ProductAvailabilityDetails],
      providers: [],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(ProductAvailabilityDetails);
    component = fixture.componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);
    component.productQuantityInfo = getProducts(Language.en).length
      ? getProducts(Language.en)[0].counts
      : [];
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have countries info', async () => {
    expect(component.productQuantityInfo.length).toBe(
      getProducts(Language.en)[0]?.counts?.length || 0
    );
  });

  it('default country should be selected', async () => {
    expect(component.selectedCountry?.location).toBe(
      component.productQuantityInfo[0]?.location
    );
  });

  it('country should be updated with provided value', async () => {
    const newCountryInfo = component.productQuantityInfo[1];
    component.selectedCountry = newCountryInfo;
    const selectHarness = await loader.getHarness(MatSelectHarness);
    fixture.detectChanges();
    await fixture.whenStable();
    expect(await selectHarness.getValueText()).toBe(newCountryInfo?.location);
  });

  xit('price should be updated with provided value', async () => {
    const newCountryInfo = component.productQuantityInfo[1];
    component.selectedCountry = newCountryInfo;
    fixture.detectChanges();
    await fixture.whenStable();
    const harness = await loader.getHarness(ProductAvailabilityDetailsHarness);
    expect(await harness.getPriceValue()).toBe(newCountryInfo?.price);
    // expect(await compHarness.getQuantityAvailableValue()).toBe(
    //   newCountryInfo?.quantityAvailable
    // );
  });
});
