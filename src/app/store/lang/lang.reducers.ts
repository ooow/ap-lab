import {Action, createReducer, on} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import * as LangActions from './lang.actions';

const langReducer = createReducer(Language.en,
  on(LangActions.change, (state: string, {lang}) => lang));

export function reducer(state: Language, action: Action): string {
  return langReducer(state, action);
}
