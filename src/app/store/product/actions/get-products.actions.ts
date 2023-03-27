import {createAction, props} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export const getProductsAction = createAction('[Products API] Get products',
  props<{ lang: Language; pageIndex: number }>());

export const getProductsSuccessAction = createAction(
  '[Products API] Get products success',
  props<{ products: Product[]; totalNumber: number }>());

export const getProductsFailureAction = createAction(
  '[Products API] Get products failure',
  props<{ error: BackendErrorsInterface }>());
