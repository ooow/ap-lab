import {createAction, props} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export const deleteProductAction = createAction(
  '[Stored Product] Delete product',
  props<{ lang: Language; product: Product }>());

export const deleteProductSuccessAction = createAction(
  '[Stored Product] Delete product success', props<{ product: Product }>());

export const deleteProductFailureAction = createAction(
  '[Stored Product] Delete product failure',
  props<{ error: BackendErrorsInterface }>());
