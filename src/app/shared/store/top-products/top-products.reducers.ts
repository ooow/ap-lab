import { Action, createReducer, on } from '@ngrx/store';
import { TopProductsState } from 'src/app/shared/models/top-products-state';
import { createProductSuccessAction } from 'src/app/shared/store/create-product/actions/create-product.actions';
import {
  getTopProductsAction,
  getTopProductsFailureAction,
  getTopProductsSuccessAction
} from 'src/app/shared/store/top-products/actions/get-top-products.action';

export const initialState: TopProductsState = {
  topProducts: [],
  isLoading: false,
  error: null
};

const topProductReducer = createReducer(
  initialState,
  on(getTopProductsAction, (state: TopProductsState) => ({
    ...state,
    isLoading: true
  })),
  on(getTopProductsSuccessAction, (state: TopProductsState, { products }) => ({
    ...state,
    isLoading: false,
    topProducts: products
  })),
  on(getTopProductsFailureAction, (state: TopProductsState, { error }) => ({
    ...state,
    isLoading: false,
    error
  })),
  on(createProductSuccessAction, (state: TopProductsState, { product }) => ({
    ...state,
    topProducts: [product, ...state.topProducts]
  }))
);

export function reducer(
  state: TopProductsState | undefined,
  action: Action
): TopProductsState {
  return topProductReducer(state, action);
}
