import {createSelector} from '@ngrx/store';
import {AppState} from 'src/app/shared/model/app_state';
import {ProductState} from 'src/app/shared/model/product_state';

export const productFeature = (state: AppState) => state.product;

export const products = createSelector(productFeature,
  (state: ProductState) => state.products);

export const search = createSelector(productFeature,
  (state: ProductState) => state.search);

export const pageIndex = createSelector(productFeature,
  (state: ProductState) => state.pageIndex);

export const totalNumber = createSelector(productFeature,
  (state: ProductState) => state.totalNumber);

export const isLoading = createSelector(productFeature,
  (state: ProductState) => state.isLoading);

export const error = createSelector(productFeature,
  (state: ProductState) => state.error);
