import { createSelector } from '@ngrx/store';
import { AppState } from '../../models/app-state';
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

export const pageIndex = createSelector(
  productFeature,
  (state: ProductState) => state.pageIndex
);

export const topProducts = createSelector(
  productFeature,
  (state: ProductState) => state.topProducts
);

export const totalNumber = createSelector(
  productFeature,
  (state: ProductState) => state.totalNumber
);
