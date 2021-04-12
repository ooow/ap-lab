import { createAction, props } from '@ngrx/store';

export const change = createAction('[App component] Change app language', props<{ lang }>());
