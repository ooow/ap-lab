import { Action, createReducer, on } from '@ngrx/store';
import { CreateProductState } from 'src/app/shared/models/create-product-state';
import {
  createProductAction,
  createProductFailureAction,
  createProductSuccessAction
} from 'src/app/shared/store/create-product/actions/create-product.actions';

export const initialState: CreateProductState = {
  isLoading: false,
  message: null,
  error: null
};

const createProductReducer = createReducer(
  initialState,
  on(createProductAction, (state: CreateProductState, { productData }) => ({
    ...state,
    isLoading: true,
    message: `${productData.name} is being created...`
  })),
  on(createProductSuccessAction, (state: CreateProductState, { product }) => ({
    ...state,
    isLoading: false,
    message: `${product.name} was successfully created!`
  })),
  on(createProductFailureAction, (state: CreateProductState, { error }) => ({
    ...state,
    isLoading: false,
    message: 'Oops, something went wrong... Try Again!',
    error
  }))
);

export function reducer(
  state: CreateProductState | undefined,
  action: Action
): CreateProductState {
  return createProductReducer(state, action);
}
