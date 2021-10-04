import { Component } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Store } from '@ngrx/store';
import { combineLatest, Observable, of } from 'rxjs';
import { map, switchMap, take } from 'rxjs/operators';

import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { CreateProductModalComponent } from 'src/app/shared/modules/create-product-modal/create-product-modal.component';
import { ProductService } from 'src/app/shared/services/product.service';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import { getProductsAction } from 'src/app/shared/store/product/actions/get-products.actions';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/shared/store/product/product.selectors';
import { getTopProductsAction } from 'src/app/shared/store/top-products/actions/get-top-products.action';
import * as TopProductsSelector from 'src/app/shared/store/top-products/top-products.selectors';
import { CreateProductFormType } from 'src/app/shared/types/create-product-form.type';
import { CreateProductResponseType } from 'src/app/shared/types/create-product-response.type';

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
    private productService: ProductService,
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
      width: '500px'
    });

    const formValues$ = createProductDialogRef.afterClosed();

    combineLatest([formValues$, this.lang$])
      .pipe(
        take(1),
        switchMap(([formValues, lang]) =>
          formValues
            ? this.productService.createProduct(formValues, lang)
            : of(formValues)
        )
      )
      .subscribe((result: CreateProductResponseType | null) => {
        if (result) {
          this.openSnackBar(result.message);
          this.updateProducts();
        }
      });
  }

  private updateProducts(): void {
    this.lang$.pipe(take(1)).subscribe((lang) => {
      this.store.dispatch(getProductsAction({ lang, pageIndex: 0 }));
      this.store.dispatch(getTopProductsAction({ lang }));
    });
  }

  private openSnackBar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 5000,
      horizontalPosition: 'right'
    });
  }
}
