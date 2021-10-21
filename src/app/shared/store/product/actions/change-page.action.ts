import { createAction, props } from '@ngrx/store';

export const changePageAction = createAction(
  '[Products table] Change table page',
  props<{ pageIndex: number }>()
);
