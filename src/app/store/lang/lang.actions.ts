import {createAction, props} from '@ngrx/store';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';

export const change = createAction('[App component] Change app language',
  props<{ lang: Language }>());
