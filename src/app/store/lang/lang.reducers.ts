import { Action, createReducer, on } from '@ngrx/store';
import * as LangActions from './lang.actions';
import { Lang } from '../../models/lang';

export const initialState: Lang = 'en' as Lang;

const langReducer = createReducer(
  initialState,
  on(LangActions.change, (state, { lang }) => lang)
);

export function reducer(state: Lang, action: Action): string {
  return langReducer(state, action);
}
