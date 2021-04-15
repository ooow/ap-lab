import { Action, createReducer, on } from '@ngrx/store';
import { ProductState } from '../../models/product-state';
import { ProductsResp } from '../../models/products-resp';
import * as ProductActions from './product.actions';

export const initialState: ProductState = {
  topProducts: [],
  products: [],
  search: '',
  pageIndex: 0,
  totalNumber: 0
};

const productReducer = createReducer(
  initialState,
  on(
    ProductActions.search,
    (state: ProductState, { search }: { search: string }) =>
      Object.assign({}, state, { search })
  ),
  on(
    ProductActions.retrieveProducts,
    (state: ProductState, resp: ProductsResp) => Object.assign({}, state, resp)
  ),
  on(ProductActions.changePage, (state: ProductState, { pageIndex }) =>
    Object.assign({}, state, { pageIndex })
  ),
  on(ProductActions.topProducts, (state: ProductState, { products }) =>
    Object.assign({}, state, { topProducts: products })
  )
);

export function reducer(
  state: ProductState | undefined,
  action: Action
): ProductState {
  return productReducer(state, action);
}
