import {createAction, props} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export const createProductAction = createAction(
  '[Stored Product] Create product',
  props<{ lang: Language; productData: Product }>());

export const createProductSuccessAction = createAction(
  '[Stored Product] Create product success', props<{ product: Product }>());

export const createProductFailureAction = createAction(
  '[Stored Product] Create product failure',
  props<{ error: BackendErrorsInterface }>());
