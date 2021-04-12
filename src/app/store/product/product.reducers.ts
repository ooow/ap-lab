import { Action, createReducer, on } from '@ngrx/store';
import { Product } from '../../models/product';
import { ProductState } from '../../models/product-state';
import * as ProductActions from './product.actions';

export const initialState: ProductState = {
  products: [],
  search: ''
};

const productReducer = createReducer(
  initialState,
  on(ProductActions.search, (state: ProductState, { search }: { search: string }) =>
    Object.assign({}, state, { search })
  ),
  on(ProductActions.retrieveProducts, (state: ProductState, { products }: { products: ReadonlyArray<Product> }) =>
    Object.assign({}, state, { products })
  )
);

export function reducer(state: ProductState | undefined, action: Action): ProductState {
  return productReducer(state, action);
}
