import {Action, createReducer, on} from '@ngrx/store';

import {ProductState} from 'src/app/shared/model/product_state';
import {changePageAction} from 'src/app/store/product/actions/change-page.action';
import {getProductsAction, getProductsFailureAction, getProductsSuccessAction} from 'src/app/store/product/actions/get-products.actions';
import {searchProductAction} from 'src/app/store/product/actions/search-product.action';
import {createProductSuccessAction} from 'src/app/store/stored-product/actions/create-product.actions';

export const initialState: ProductState = {
  products   : [],
  search     : '',
  pageIndex  : 0,
  totalNumber: 0,
  isLoading  : false,
  error      : null,
};

const productReducer = createReducer(initialState,
  on(getProductsAction, (state: ProductState) => ({
    ...state, isLoading: true,
  })), on(getProductsSuccessAction,
    (state: ProductState, {products, totalNumber}) => ({
      ...state, isLoading: false, products, totalNumber,
    })), on(getProductsFailureAction, (state: ProductState, {error}) => ({
    ...state, isLoading: false, error,
  })),

  on(searchProductAction, (state: ProductState, {search}) => ({
    ...state, search,
  })),

  on(changePageAction, (state: ProductState, {pageIndex}) => ({
    ...state, pageIndex,
  })),

  on(createProductSuccessAction, (state: ProductState, {product}) => ({
    ...state, products: [product, ...state.products.slice(0, -1)],
  })));

export function reducer(state: ProductState | undefined,
  action: Action): ProductState {
  return productReducer(state, action);
}
