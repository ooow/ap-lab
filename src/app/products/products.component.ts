import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, take, takeUntil } from 'rxjs/operators';
import { Lang } from 'src/app/shared/models/lang';

import { Product } from 'src/app/shared/models/product';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import { changePageAction } from 'src/app/shared/store/product/actions/change-page.action';
import { getProductsAction } from 'src/app/shared/store/product/actions/get-products.actions';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/shared/store/product/product.selectors';
import { deleteProductAction } from 'src/app/shared/store/stored-product/actions/delete-product.actions';
import { getTopProductsAction } from 'src/app/shared/store/top-products/actions/get-top-products.action';
import * as TopProductsSelectors from 'src/app/shared/store/top-products/top-products.selectors';
import { ProductDeleteConfirmDialogComponent } from './components/product-delete-confirm-dialog/product-delete-confirm-dialog.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';

@Component({
  selector: 'tk-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnDestroy, OnInit {
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products
  );
  readonly pageIndex$: Observable<number> = this.store.select(
    ProductSelectors.pageIndex
  );
  readonly totalNumber$: Observable<number> = this.store.select(
    ProductSelectors.totalNumber
  );
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    TopProductsSelectors.topProducts
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly isLoading$: Observable<boolean> = this.store.select(
    ProductSelectors.isLoading
  );
  readonly isGlobalLoading$: Observable<boolean> = this.store.select(
    TopProductsSelectors.isLoading
  );
  private readonly destroy$ = new Subject<void>();

  constructor(
    readonly store: Store,
    readonly dialog: MatDialog,
    readonly router: Router
  ) {}

  ngOnInit(): void {
    this.clearSearch();
    this.updateProducts();
    this.updateTopProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  updateProducts(): void {
    combineLatest([this.lang$, this.pageIndex$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([lang, pageIndex]) => {
        this.store.dispatch(getProductsAction({ lang, pageIndex }));
      });
  }

  updateTopProducts(): void {
    this.lang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      this.store.dispatch(getTopProductsAction({ lang }));
    });
  }

  clearSearch(): void {
    this.store.dispatch(searchProductAction({ search: '' }));
  }

  showProductDetails(product: Product): void {
    const showProductDetailsRef = this.dialog.open(
      ProductDetailsModalComponent,
      {
        width: '600px',
        data: { product }
      }
    );

    showProductDetailsRef
      .afterClosed()
      .pipe(take(1), filter(Boolean))
      .subscribe(() => this.onDeleteProduct(product));
  }

  showConfirmDeleteDialog(product: Product): void {
    const confirmDeleteDialogRef = this.dialog.open(
      ProductDeleteConfirmDialogComponent,
      {
        data: product
      }
    );

    confirmDeleteDialogRef
      .afterClosed()
      .pipe(
        take(1),
        filter(Boolean)
      )
      .subscribe(() => this.onDeleteProduct(product))
  }

  onPageChange(pageIndex: number): void {
    this.store.dispatch(changePageAction({ pageIndex }));
  }

  onDeleteProduct(product: Product): void {
    let lang: Lang;
    this.lang$.pipe(take(1)).subscribe((currentLang) => {
      lang = currentLang;
    });
    this.store.dispatch(deleteProductAction({ product, lang }));
  }
}
