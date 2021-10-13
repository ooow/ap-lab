import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductService } from 'src/app/shared/services/product.service';
import {
  createProductAction,
  createProductFailureAction,
  createProductSuccessAction
} from 'src/app/shared/store/create-product/actions/create-product.actions';

@Injectable()
export class CreateProductEffect {
  createProduct$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProductAction),
      switchMap(({ productData, lang }) => {
        console.log('effect called');
        return this.productService.createProduct(productData, lang).pipe(
          map(({ data }) => {
            return createProductSuccessAction({ product: data });
          }),
          catchError((errorResponse: HttpErrorResponse) => {
            return of(
              createProductFailureAction({ error: errorResponse.error })
            );
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
