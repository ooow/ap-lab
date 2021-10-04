import { createAction, props } from '@ngrx/store';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const getProductsAction = createAction(
  '[Products API] Get products',
  props<{ lang: Lang; pageIndex: number }>()
);

export const getProductsSuccessAction = createAction(
  '[Products API] Get products success',
  props<{ products: Product[]; totalNumber: number }>()
);

export const getProductsFailureAction = createAction(
  '[Products API] Get products failure',
  props<{ errors: BackendErrorsInterface }>()
);
