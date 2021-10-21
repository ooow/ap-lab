import { createAction, props } from '@ngrx/store';
import { Lang } from 'src/app/shared/models/lang';

export const change = createAction(
  '[App component] Change app language',
  props<{ lang: Lang }>()
);
