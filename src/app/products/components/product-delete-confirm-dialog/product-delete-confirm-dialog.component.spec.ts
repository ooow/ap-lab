import { HarnessLoader } from "@angular/cdk/testing";
import { TestbedHarnessEnvironment } from "@angular/cdk/testing/testbed";
import { Component } from "@angular/core";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatDialog, MatDialogModule } from "@angular/material/dialog";
import { MatDialogHarness } from "@angular/material/dialog/testing";
import { NoopAnimationsModule } from "@angular/platform-browser/animations";
import { take } from "rxjs/operators";

import { Product } from "src/app/shared/models/product";
import { ProductDeleteConfirmDialogComponent } from "./product-delete-confirm-dialog.component";
import { ProductDeleteConfirmDialogHarness } from "./product-delete-confirm-dialog.harness";

const product = {
  name: "test product",
  description: "test description",
  picture: "picture url"
}

describe("AppModule => ProductDeleteConfirmDialogComponent", () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: TestComponent;
  let dialogHarness: ProductDeleteConfirmDialogHarness;
  let rootLoader: HarnessLoader;

  @Component({
    selector: "tk-test",
    template: "<button (click)='openDialog()'></button>"
  })
  class TestComponent {
    receivedData: Product;

    constructor(public dialog: MatDialog) {}

    openDialog(): void {
      const dialogRef = this.dialog.open(
        ProductDeleteConfirmDialogComponent,
        { data: product },
      )

      dialogRef
        .afterClosed()
        .pipe(take(1))
        .subscribe((value) => {
            this.receivedData = value;
        });
      }
    }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        MatDialogModule,
        MatButtonModule,
        NoopAnimationsModule
      ],
      declarations: [ProductDeleteConfirmDialogComponent, TestComponent]
    });

    fixture = TestBed.createComponent(TestComponent);
    rootLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);
    component = fixture.componentInstance;

    component.openDialog();
    fixture.detectChanges();
    await fixture.whenStable();

    dialogHarness = await rootLoader.getHarness(ProductDeleteConfirmDialogHarness);
  })

  it("should be created", () => {
    expect(component).not.toBeNull();
  });

  it("should be rendered appropriately", async () => {
    expect(await dialogHarness.titleText()).toBe("Please confirm");
    expect(await dialogHarness.dialogBodyText()).toContain(product.name);
    expect(await dialogHarness.cancelButton()).not.toBeNull();
    expect(await dialogHarness.deleteButton()).not.toBeNull();
  })

  describe("cancel button", () => {
      it("should not emit data on click", async () => {
          await dialogHarness.clickCancelButton();
          expect(component.receivedData).toBeUndefined();
      });

      it("should close dialog", async () => {
          await dialogHarness.clickCancelButton();
          expect(await rootLoader.getAllHarnesses(MatDialogHarness)).toHaveSize(0);
      });
  });

  describe("delete button", () => {
      it("should emit data on click", async () => {
          await dialogHarness.clickDeleteButton();
          expect(component.receivedData).toEqual(product)
      });

      it("should close dialog", async () => {
          await dialogHarness.clickDeleteButton();
          expect(await rootLoader.getAllHarnesses(MatDialogHarness)).toHaveSize(0);
      })
  })
});