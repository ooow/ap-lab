import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ProductDetailsModalComponent } from './product-details-modal.component';
import { ProductDetailsModalHarness } from './product-details-modal.harness';

describe('AppModule => ProductDetailsModalComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let loader: HarnessLoader;
  let rootLoader: HarnessLoader;
  const product = {
    name: 'name',
    description: 'description',
    picture: 'pictureUrl'
  };

  @Component({
    selector: 'tk-test',
    template: '<button (click)="open()"></button>'
  })
  class TestComponent {
    constructor(public dialog: MatDialog) {}

    open(): void {
      this.dialog.open(ProductDetailsModalComponent, {
        data: { product }
      });
    }
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatIconModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [ProductDetailsModalComponent, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    loader = TestbedHarnessEnvironment.loader(fixture);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;

    component.open();
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should be rendered appropriately to provided data', async () => {
    const modal = await rootLoader.getHarness(ProductDetailsModalHarness);

    expect(await modal.titleText()).toContain(product.name);
    expect(await (await modal.picture()).getAttribute('src')).toBe(
      product.picture
    );
    expect(await (await modal.picture()).getAttribute('alt')).toBe(
      product.name
    );
    expect(await modal.description()).toBe(product.description);
  });

  describe('close button', () => {
    it('should close product details modal window', async () => {
      const modal = await rootLoader.getHarness(ProductDetailsModalHarness);

      await modal.closeBtnClick();

      // prettier-ignore
      expect((await rootLoader.getAllHarnesses(MatDialogHarness)).length).toBe(0);
    });
  });
});
