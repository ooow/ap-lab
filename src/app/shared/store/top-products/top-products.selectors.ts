import { createSelector } from '@ngrx/store';
import { AppState } from 'src/app/shared/models/app-state';
import { TopProductsState } from 'src/app/shared/models/top-products-state';

export const topProductsFeature = (state: AppState) => state.topProducts;

export const topProducts = createSelector(
  topProductsFeature,
  (state: TopProductsState) => state.topProducts
);

export const isLoading = createSelector(
  topProductsFeature,
  (state: TopProductsState) => state.isLoading
);

export const error = createSelector(
  topProductsFeature,
  (state: TopProductsState) => state.error
);
