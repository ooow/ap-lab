import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/app-state';
import { CreateProductState } from 'src/app/shared/models/create-product-state';

export const createProductFeature = (state: AppState) => state.createProduct;

export const isLoading = createSelector(
  createProductFeature,
  (state: CreateProductState) => state.isLoading
);

export const error = createSelector(
  createProductFeature,
  (state: CreateProductState) => state.error
);

export const message = createSelector(
  createProductFeature,
  (state: CreateProductState) => state.message
);
