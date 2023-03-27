import {Action, createReducer, on} from '@ngrx/store';
import {TopProductsState} from 'src/app/shared/model/top_products_state';
import {createProductSuccessAction} from 'src/app/store/stored-product/actions/create-product.actions';
import {getTopProductsAction, getTopProductsFailureAction, getTopProductsSuccessAction} from 'src/app/store/top-products/actions/get-top-products.action';

export const initialState: TopProductsState = {
  topProducts: [], isLoading: false, error: null,
};

const topProductReducer = createReducer(initialState,
  on(getTopProductsAction, (state: TopProductsState) => ({
    ...state, isLoading: true,
  })),
  on(getTopProductsSuccessAction, (state: TopProductsState, {products}) => ({
    ...state, isLoading                    : false, topProducts: products,
  })), on(getTopProductsFailureAction, (state: TopProductsState, {error}) => ({
    ...state, isLoading: false, error,
  })), on(createProductSuccessAction, (state: TopProductsState, {product}) => ({
    ...state, topProducts: [product, ...state.topProducts.slice(0, -1)],
  })));

export function reducer(state: TopProductsState | undefined,
  action: Action): TopProductsState {
  return topProductReducer(state, action);
}
