import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatIconModule } from '@angular/material/icon';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { take } from 'rxjs/operators';
import { Product } from 'src/app/shared/models/product';
import { ProductDetailsModalComponent } from './product-details-modal.component';
import { ProductDetailsModalHarness } from './product-details-modal.harness';

const product = {
  name: 'name',
  description: 'description',
  picture: 'pictureUrl'
};

describe('AppModule => ProductDetailsModalComponent', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let modalHarness: ProductDetailsModalHarness;
  let rootLoader: HarnessLoader;

  @Component({
    selector: 'tk-test',
    template: '<button (click)="openWithoutId()"></button>'
  })
  class TestComponent {
    receivedOnDelete: Product;

    constructor(public dialog: MatDialog) {}

    openWithId(): void {
      const dialogRef = this.dialog.open(ProductDetailsModalComponent, {
        data: { product: { ...product, id: 1 } }
      });

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((val) => {
          this.receivedOnDelete = val;
        });
    }

    openWithoutId(): void {
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
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;

    component.openWithoutId();
    fixture.detectChanges();
    await fixture.whenStable();

    modalHarness = await rootLoader.getHarness(ProductDetailsModalHarness);
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  it('should be rendered appropriately to provided data', async () => {
    expect(await modalHarness.titleText()).toContain(product.name);
    expect(await (await modalHarness.picture()).getAttribute('src')).toBe(
      product.picture
    );
    expect(await (await modalHarness.picture()).getAttribute('alt')).toBe(
      product.name
    );
    expect(await modalHarness.description()).toBe(product.description);
  });

  describe('delete button', () => {
    it('should not render delete btn when product does not have id field', async () => {
      expect(await modalHarness.deleteProductBtn()).toBe(null);
    });

    it('should render delete btn when product has id field', async () => {
      await modalHarness.closeBtnClick();
      component.openWithId();
      const modalWithDeleteBtn = await rootLoader.getHarness(
        ProductDetailsModalHarness
      );

      expect(await modalWithDeleteBtn.deleteProductBtn()).toBeTruthy();
    });

    it('should emit product data on delete btn click', async () => {
      await modalHarness.closeBtnClick();
      component.openWithId();
      const modalWithDeleteBtn = await rootLoader.getHarness(
        ProductDetailsModalHarness
      );
      const deleteBtn = await modalWithDeleteBtn.deleteProductBtn();

      if (deleteBtn) {
        await deleteBtn.click();
      }

      expect(component.receivedOnDelete).toEqual({ ...product, id: 1 });
    });
  });

  describe('close button', () => {
    it('should close product details modal window', async () => {
      await modalHarness.closeBtnClick();
      expect((await rootLoader.getAllHarnesses(MatDialogHarness)).length).toBe(
        0
      );
    });
  });
});
