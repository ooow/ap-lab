import { AppState } from '../../models/app-state';
import { createSelector } from '@ngrx/store';
import { ProductState } from '../../models/product-state';

export const productFeature = (state: AppState) => state.product;

export const products = createSelector(
  productFeature,
  (state: ProductState) => state.products
);

export const search = createSelector(
  productFeature,
  (state: ProductState) => state.search
);
