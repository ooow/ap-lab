import { createAction, props } from '@ngrx/store';

export const search = createAction('[Root] Product search value changed', props<{ search }>());

export const retrieveProducts = createAction('[Products API] Retrieve products request', props<{ products }>());
