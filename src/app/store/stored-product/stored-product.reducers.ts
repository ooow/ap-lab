import {Action, createReducer, on} from '@ngrx/store';
import {StoredProductState} from 'src/app/shared/model/stored_product_state';
import {createProductAction, createProductFailureAction, createProductSuccessAction} from 'src/app/store/stored-product/actions/create-product.actions';
import {deleteProductAction, deleteProductFailureAction, deleteProductSuccessAction} from 'src/app/store/stored-product/actions/delete-product.actions';

export const initialState: StoredProductState = {
  isLoading: false, message: null, error: null,
};

const storedProductReducer = createReducer(initialState,
  on(createProductAction, (state: StoredProductState, {productData}) => ({
    ...state,
    isLoading: true,
    message  : `${productData.name} is being created...`,
  })),
  on(createProductSuccessAction, (state: StoredProductState, {product}) => ({
    ...state,
    isLoading: false,
    message  : `${product.name} was successfully created!`,
  })), on(createProductFailureAction, (state: StoredProductState, {error}) => ({
    ...state,
    isLoading: false,
    message  : 'Oops, something went wrong... Try Again!',
    error,
  })), on(deleteProductAction, (state: StoredProductState, {product}) => ({
    ...state, isLoading               : true, message: `${product.name} is being deleted...`,
  })),
  on(deleteProductSuccessAction, (state: StoredProductState, {product}) => ({
    ...state,
    isLoading: false,
    message  : `${product.name} was successfully deleted!`,
  })), on(deleteProductFailureAction, (state: StoredProductState, {error}) => ({
    ...state,
    isLoading: false,
    message  : 'Oops, something went wrong... Try Again!',
    error,
  })));

export function reducer(state: StoredProductState | undefined,
  action: Action): StoredProductState {
  return storedProductReducer(state, action);
}
