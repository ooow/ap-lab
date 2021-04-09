import { Action, createReducer, on } from '@ngrx/store';
import * as ProductActions from './product.actions';
import { ProductState } from '../../models/product-state';

export const initialState: ProductState = {
  products: [],
  search: '',
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.search, (state, { search }) =>
    Object.assign({}, state, { search })
  ),
  on(ProductActions.retrieveProducts, (state, { products }) =>
    Object.assign({}, state, { products })
  )
);

export function reducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return productReducer(state, action);
}
