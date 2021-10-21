import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import {
  getProductsAction,
  getProductsFailureAction,
  getProductsSuccessAction
} from 'src/app/shared/store/product/actions/get-products.actions';

@Injectable()
export class GetProductEffect {
  getProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getProductsAction),
      switchMap(({ lang, pageIndex }) => {
        return this.productService.getProducts(lang, pageIndex).pipe(
          map((resp) => {
            return getProductsSuccessAction(resp);
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(getProductsFailureAction({ error: errorResponse.error }));
          })
        );
      })
    )
  );

  constructor(
    private actions$: Actions,
    private productService: ProductService
  ) {}
}
