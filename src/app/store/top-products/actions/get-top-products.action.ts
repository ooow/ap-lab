import {createAction, props} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export const getTopProductsAction = createAction(
  '[Products API] Get top products', props<{ lang: Language }>());

export const getTopProductsSuccessAction = createAction(
  '[Products API] Get top products success', props<{ products }>());

export const getTopProductsFailureAction = createAction(
  '[Products API] Get top products failure',
  props<{ error: BackendErrorsInterface }>());
