import {HttpErrorResponse} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Actions, createEffect, ofType} from '@ngrx/effects';

import {of} from 'rxjs';
import {catchError, map, switchMap} from 'rxjs/operators';
import {ProductService} from 'src/app/shared/service/product_service';
import {getTopProductsAction, getTopProductsFailureAction, getTopProductsSuccessAction} from 'src/app/store/top-products/actions/get-top-products.action';

@Injectable()
export class GetTopProductsEffect {
  getTopProduct$ = createEffect(
    () => this.actions$.pipe(ofType(getTopProductsAction),
      switchMap(({lang}) => {
        return this.productService.getProducts(lang, 0, 5).pipe(map((resp) => {
          return getTopProductsSuccessAction(resp);
        }), catchError((errorResponse: HttpErrorResponse) => {
          return of(getTopProductsFailureAction({
            error: errorResponse.error,
          }));
        }));
      })));

  constructor(private actions$: Actions,
    private productService: ProductService) {}
}
