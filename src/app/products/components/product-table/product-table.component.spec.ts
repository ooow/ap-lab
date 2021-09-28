import { By } from '@angular/platform-browser';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HarnessLoader } from '@angular/cdk/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginatorHarness } from '@angular/material/paginator/testing';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRowHarness } from '@angular/material/table/testing/row-harness';
import { MatSortModule } from '@angular/material/sort';
import { MatSortHarness } from '@angular/material/sort/testing';
import { MatTableModule } from '@angular/material/table';
import { MatTableHarness } from '@angular/material/table/testing';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';

import { ProductTableComponent } from './product-table.component';
import { ProductTableHarness } from './product-table.harness';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'tk-test',
  template: '<tk-product-table></tk-product-table>'
})
class TestComponent {}

describe('AppModule => ProductTable', () => {
  let fixture: ComponentFixture<TestComponent>;
  let component: ProductTableComponent;
  let loader: HarnessLoader;
  const products = [
    {
      name: 'first',
      picture: 'picUrl',
      description: 'firstDesc',
      counts: [
        { location: 'firstLocation', quantityAvailable: 666, price: 999 }
      ]
    },
    {
      name: 'second',
      picture: 'picUrl',
      description: 'secondDesc',
      counts: [
        { location: 'firstLocation', quantityAvailable: 999, price: 666 }
      ]
    }
  ];

  const fakeSnackBarService = jasmine.createSpyObj<MatSnackBar>('MatSnackBar', [
    'open'
  ]);

  beforeEach(async () => {
    fakeSnackBarService.open.calls.reset();

    await TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatPaginatorModule,
        MatProgressSpinnerModule,
        MatSortModule,
        NoopAnimationsModule,
        MatIconModule,
        MatTooltipModule,
        ClipboardModule
      ],
      declarations: [TestComponent, ProductTableComponent],
      providers: [{ provide: MatSnackBar, useValue: fakeSnackBarService }]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.debugElement.query(By.css('tk-product-table'))
      .componentInstance;
    loader = TestbedHarnessEnvironment.loader(fixture);

    component.products = products;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should be created', () => {
    expect(component).not.toBeNull();
  });

  describe('loading spinner', () => {
    it('should be hidden by default', async () => {
      const harness = await loader.getHarness(ProductTableHarness);

      expect(await harness.isLoading()).toBeFalse();
    });

    it('should be visible', async () => {
      const harness = await loader.getHarness(ProductTableHarness);

      component.loading = true;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(await harness.isLoading()).toBeTrue();
    });

    it('should be hidden', async () => {
      const harness = await loader.getHarness(ProductTableHarness);

      component.loading = false;
      fixture.detectChanges();
      await fixture.whenStable();

      expect(await harness.isLoading()).toBeFalse();
    });
  });

  describe('paginator', () => {
    const totalNumber = 20;
    const pageIndex = 0;
    let paginator: MatPaginatorHarness;

    beforeEach(async () => {
      paginator = await loader.getHarness(MatPaginatorHarness);
    });

    it('should be rendered appropriately', async () => {
      let rangeLabel: string;

      component.pageIndex = pageIndex;
      component.totalNumber = totalNumber;
      fixture.detectChanges();
      await fixture.whenStable();

      rangeLabel = await paginator.getRangeLabel();

      expect(await paginator.getPageSize()).toBe(10);
      expect(rangeLabel).toContain((pageIndex + 1).toString());
      expect(rangeLabel).toContain((10).toString());
      expect(rangeLabel).toContain(totalNumber.toString());
    });

    it('should propagate page change event', async () => {
      spyOn(component.pageChange, 'emit');

      component.pageIndex = pageIndex;
      component.totalNumber = totalNumber;
      fixture.detectChanges();
      await fixture.whenStable();
      await paginator.goToNextPage();

      expect(component.pageChange.emit).toHaveBeenCalledWith(1);
    });
  });

  describe('table', () => {
    it('should have appropriate column names', async () => {
      const table = await loader.getHarness(MatTableHarness);
      const [headerRow] = await table.getHeaderRows();
      const [first, second, third] = await headerRow.getCells();

      expect(await first.getText()).toBe('Name');
      expect(await second.getText()).toBe('Picture Url');
      expect(await third.getText()).toBe('Description');
    });

    it('should be rendered appropriately to provided products', async () => {
      const [firstProduct] = products;
      const productTableHarness = await loader.getHarness(ProductTableHarness);
      const table = await loader.getHarness(MatTableHarness);
      const rows = await table.getRows();
      const firstRowCells = await rows[0].getCells();
      const [firstCell, _, thirdCell] = firstRowCells;

      expect(rows.length).toBe(products.length);
      expect(firstRowCells.length).toBe(3);
      expect(await firstCell.getText()).toBe(firstProduct.name);
      expect(await productTableHarness.pictureUrl()).toBe(firstProduct.picture);
      expect(await thirdCell.getText()).toBe(firstProduct.description);
      // render copy button icon
      const copyUrlBtn = await productTableHarness.getCopyPictureUrlBtn();
      expect(await copyUrlBtn.text()).toBe('file_copy');
    });

    it('should copy pic url on Copy Url btn click', async () => {
      spyOn(document, 'execCommand');
      const harness = await loader.getHarness(ProductTableHarness);

      await harness.clickCopyPicUrlBtn();

      expect(document.execCommand).toHaveBeenCalledWith('copy');
    });

    it('should call snackBar open method with expected params on Copy Url btn click', async () => {
      const harness = await loader.getHarness(ProductTableHarness);
      const expectedParams = [
        'first picture link copied to clipboard',
        'Close',
        { duration: 5000, horizontalPosition: 'right' }
      ] as const;

      expect(fakeSnackBarService.open).toHaveBeenCalledTimes(0);

      await harness.clickCopyPicUrlBtn();

      expect(fakeSnackBarService.open).toHaveBeenCalledOnceWith(
        ...expectedParams
      );
    });

    it('should show description tooltip', async () => {
      const harness = await loader.getHarness(ProductTableHarness);
      const expectedDescription = products[1].description;
      const tooltipText = await harness.getDescriptionTooltipText(1);
      expect(expectedDescription).toEqual(tooltipText);
    });

    it('should filter products by product name', async () => {
      let rows: MatRowHarness[];
      const table = await loader.getHarness(MatTableHarness);

      component.search = 'first';
      fixture.detectChanges();
      await fixture.whenStable();

      rows = await table.getRows();

      expect(rows.length).toBe(1);
    });

    it('should sort products', async () => {
      const sort = await loader.getHarness(MatSortHarness);
      const sortHeaders = await sort.getSortHeaders();
      const table = await loader.getHarness(MatTableHarness);
      let [first] = await table.getRows();

      expect((await first.getCellTextByIndex({ columnName: 'name' }))[0]).toBe(
        products[0].name
      );

      await sortHeaders[0].click();
      await sortHeaders[0].click();

      [first] = await table.getRows();

      expect((await first.getCellTextByIndex({ columnName: 'name' }))[0]).toBe(
        products[1].name
      );
    });
  });
});
