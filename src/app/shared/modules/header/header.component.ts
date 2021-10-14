import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';

import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { CreateProductModalComponent } from 'src/app/shared/modules/create-product-modal/create-product-modal.component';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/shared/store/product/product.selectors';
import { createProductAction } from 'src/app/shared/store/stored-product/actions/create-product.actions';
import * as CreateProductSelectors from 'src/app/shared/store/stored-product/stored-product.selectors';
import * as TopProductsSelector from 'src/app/shared/store/top-products/top-products.selectors';
import { CreateProductFormType } from 'src/app/shared/types/create-product-form.type';

@Component({
  selector: 'tk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products
  );
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    TopProductsSelector.topProducts
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  readonly searchOptions$: Observable<Array<string>> = combineLatest([
    this.products$,
    this.topProducts$
  ]).pipe(
    map(([products, topProducts]: [Product[], Product[]]) => {
      return Array.from(
        new Set([
          ...products.map((cv) => cv.name),
          ...topProducts.map((cv) => cv.name)
        ])
      );
    })
  );

  constructor(
    readonly store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  onSearchChange(search: string): void {
    this.store.dispatch(searchProductAction({ search }));
  }

  onLangChange(lang: Lang): void {
    this.store.dispatch(LangActions.change({ lang }));
  }

  createProductDialog(): void {
    const createProductDialogRef: MatDialogRef<
      CreateProductModalComponent,
      CreateProductFormType | null
    > = this.dialog.open(CreateProductModalComponent, {
      width: '500px',
      disableClose: true
    });

    const formValues$ = createProductDialogRef.afterClosed();

    combineLatest([formValues$, this.lang$])
      .pipe(
        take(1),
        filter(([formValues]) => Boolean(formValues)),
        tap(([formValues, lang]) =>
          this.store.dispatch(
            createProductAction({ productData: formValues, lang })
          )
        ),
        switchMap(() =>
          combineLatest([
            this.store.pipe(select(CreateProductSelectors.isLoading)),
            this.store.pipe(select(CreateProductSelectors.message))
          ]).pipe(take(3))
        )
      )
      .subscribe(([isLoading, message]) => {
        if (isLoading) {
          this.openSnackBar(message);
        } else if (!isLoading) {
          this.openSnackBar(message, 5000);
        }
      });
  }

  openSnackBar(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration,
      horizontalPosition: 'right'
    });
  }
}
