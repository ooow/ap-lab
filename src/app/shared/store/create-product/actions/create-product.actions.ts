import { createAction, props } from '@ngrx/store';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const createProductAction = createAction(
  '[Create Product] Create product',
  props<{ lang: Lang; productData: Product }>()
);

export const createProductSuccessAction = createAction(
  '[Create Product] Create product success',
  props<{ product: Product }>()
);

export const createProductFailureAction = createAction(
  '[Create Product] Create product failure',
  props<{ error: BackendErrorsInterface }>()
);
