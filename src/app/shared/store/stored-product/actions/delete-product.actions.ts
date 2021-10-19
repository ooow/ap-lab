import { createAction, props } from '@ngrx/store';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const deleteProductAction = createAction(
  '[Stored Product] Delete product',
  props<{ lang: Lang; product: Product }>()
);

export const deleteProductSuccessAction = createAction(
  '[Stored Product] Delete product success',
  props<{ product: Product }>()
);

export const deleteProductFailureAction = createAction(
  '[Stored Product] Delete product failure',
  props<{ error: BackendErrorsInterface }>()
);
