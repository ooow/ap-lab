import { createAction, props } from '@ngrx/store';

export const search = createAction(
  '[Root] Product search value changed',
  props<{ search }>()
);

export const retrieveProducts = createAction(
  '[Products API] Retrieve products',
  props<{ products; totalNumber }>()
);

export const changePage = createAction(
  '[Products table] Change table page',
  props<{ pageIndex }>()
);

export const topProducts = createAction(
  '[Products API] Retrieve top five products',
  props<{ products }>()
);
