import { Action, createReducer, on } from '@ngrx/store';
import { Lang } from '../../models/lang';
import * as LangActions from './lang.actions';

export const initialState: Lang = 'en' as Lang;

const langReducer = createReducer(
  initialState,
  on(LangActions.change, (state: string, { lang }: { lang: string }) => lang)
);

export function reducer(state: Lang, action: Action): string {
  return langReducer(state, action);
}
