import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/app-state';
import { StoredProductState } from 'src/app/shared/models/stored-product-state';

export const createProductFeature = (state: AppState) => state.storedProduct;

export const isLoading = createSelector(
  createProductFeature,
  (state: StoredProductState) => state.isLoading
);

export const error = createSelector(
  createProductFeature,
  (state: StoredProductState) => state.error
);

export const message = createSelector(
  createProductFeature,
  (state: StoredProductState) => state.message
);
