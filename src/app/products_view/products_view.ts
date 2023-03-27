import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Store} from '@ngrx/store';
import {combineLatest, Observable, Subject} from 'rxjs';
import {take, takeUntil} from 'rxjs/operators';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';

import {Product} from 'src/app/shared/model/product';
import * as LangSelectors from 'src/app/store/lang/lang.selectors';
import {changePageAction} from 'src/app/store/product/actions/change-page.action';
import {getProductsAction} from 'src/app/store/product/actions/get-products.actions';
import {searchProductAction} from 'src/app/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/store/product/product.selectors';
import {deleteProductAction} from 'src/app/store/stored-product/actions/delete-product.actions';
import {getTopProductsAction} from 'src/app/store/top-products/actions/get-top-products.action';
import * as TopProductsSelectors from 'src/app/store/top-products/top-products.selectors';
import {ProductDeleteDialog} from './product_delete_dialog/product_delete_dialog';
import {ProductDetailsDialog} from './product_details_dialog/product_details_dialog';

@Component({
  selector   : 'tk-products-view',
  templateUrl: './products_view.ng.html',
  styleUrls  : ['./products_view.scss'],
})
export class ProductsView implements OnDestroy, OnInit {
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products);
  readonly pageIndex$: Observable<number> = this.store.select(
    ProductSelectors.pageIndex);
  readonly totalNumber$: Observable<number> = this.store.select(
    ProductSelectors.totalNumber);
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    TopProductsSelectors.topProducts);
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search);
  readonly lang$: Observable<Language> = this.store.select(
    LangSelectors.langSelector);
  readonly isLoading$: Observable<boolean> = this.store.select(
    ProductSelectors.isLoading);
  readonly isGlobalLoading$: Observable<boolean> = this.store.select(
    TopProductsSelectors.isLoading);
  private readonly destroy$ = new Subject<void>();

  constructor(readonly store: Store, readonly dialog: MatDialog,
    readonly router: Router) {}

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
        this.store.dispatch(getProductsAction({lang, pageIndex}));
      });
  }

  updateTopProducts(): void {
    this.lang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      this.store.dispatch(getTopProductsAction({lang}));
    });
  }

  clearSearch(): void {
    this.store.dispatch(searchProductAction({search: ''}));
  }

  // showProductDetails will be passed for productDetailsDialogConfig data
  getDialogConfig(product: Product,
    showProductDetails?: boolean): MatDialogConfig<any> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.data = {
      product, ...(showProductDetails ? {deleteProduct: new Subject()} :
                   {initiateClose: new Subject()}),
    };
    return dialogConfig;
  }

  showProductDetails(product: Product): void {
    const productDetailsDialogConfig = this.getDialogConfig(product, true);
    const showProductDetailsRef = this.dialog.open(ProductDetailsDialog,
      productDetailsDialogConfig);

    productDetailsDialogConfig.data.deleteProduct
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(() => {
        showProductDetailsRef.close();
        this.onDeleteProduct(product);
      });
  }

  showConfirmDeleteDialog(product: Product): void {
    const confirmDeleteDialogConfig = this.getDialogConfig(product);
    const confirmDeleteDialogRef = this.dialog.open(ProductDeleteDialog,
      confirmDeleteDialogConfig);

    confirmDeleteDialogConfig.data.initiateClose
      .pipe(takeUntil(this.destroy$), take(1))
      .subscribe(() => {
        confirmDeleteDialogRef.close();
        this.onDeleteProduct(product);
      });
  }

  onPageChange(pageIndex: number): void {
    this.store.dispatch(changePageAction({pageIndex}));
  }

  onDeleteProduct(product: Product): void {
    this.lang$.pipe(take(1)).subscribe((lang: Language) => {
      this.store.dispatch(deleteProductAction({product, lang}));
    });
  }
}
