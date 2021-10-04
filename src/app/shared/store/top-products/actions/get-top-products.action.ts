import { createAction, props } from '@ngrx/store';
import { Lang } from 'src/app/shared/models/lang';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export const getTopProductsAction = createAction(
  '[Products API] Get top products',
  props<{ lang: Lang; quantity: number }>()
);

export const getTopProductsSuccessAction = createAction(
  '[Products API] Get top products success',
  props<{ products }>()
);

export const getTopProductsFailureAction = createAction(
  '[Products API] Get top products failure',
  props<{ errors: BackendErrorsInterface }>()
);
