import { LoaderComponent } from 'src/app/shared/modules/loader/loader.component';
import { HarnessLoader } from '@angular/cdk/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { LoaderHarness } from 'src/app/shared/modules/loader/loader.harness';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

@Component({
  selector: 'tk-test',
  template: '<tk-loader></tk-loader>'
})
class TestComponent {}

describe('Loader', () => {
  let component: LoaderComponent;
  let loader: HarnessLoader;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatProgressSpinnerModule],
      declarations: [LoaderComponent, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    component = fixture.debugElement.query(By.directive(LoaderComponent))
      .componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should show the spinner ', async () => {
    const harness = await loader.getHarness(LoaderHarness);
    expect(await harness.getLoader()).toBeTruthy();
  });
});
