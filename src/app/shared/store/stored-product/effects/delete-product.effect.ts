import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { select, Store } from '@ngrx/store';

import { of } from 'rxjs';
import { catchError, map, switchMap, withLatestFrom } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import { langSelector } from 'src/app/shared/store/lang/lang.selectors';
import { getProductsAction } from 'src/app/shared/store/product/actions/get-products.actions';
import {
  deleteProductAction,
  deleteProductFailureAction,
  deleteProductSuccessAction
} from 'src/app/shared/store/stored-product/actions/delete-product.actions';
import { getTopProductsAction } from 'src/app/shared/store/top-products/actions/get-top-products.action';

@Injectable()
export class DeleteProductEffect {
  deleteProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductAction),
      switchMap(({ product, lang }) => {
        return this.productService.deleteProduct(product, lang).pipe(
          map((response) => {
            return deleteProductSuccessAction({ product: response.product });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              deleteProductFailureAction({ error: errorResponse.error })
            );
          })
        );
      })
    )
  );

  updateProductsAfterDelete$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProductSuccessAction),
      withLatestFrom(this.store.pipe(select(langSelector))),
      switchMap(([{ product }, lang]) => [
        getTopProductsAction({ lang }),
        getProductsAction({ lang, pageIndex: 0 })
      ])
    )
  );

  constructor(
    private store: Store,
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
