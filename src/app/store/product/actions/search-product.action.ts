import {createAction, props} from '@ngrx/store';

export const searchProductAction = createAction('[Root] Search product',
  props<{ search: string }>());
