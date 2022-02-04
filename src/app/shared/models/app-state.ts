import { Lang } from 'src/app/shared/models/lang';
import { ProductState } from 'src/app/shared/models/product-state';
import { StoredProductState } from 'src/app/shared/models/stored-product-state';
import { TopProductsState } from 'src/app/shared/models/top-products-state';
import { ProductsView } from './products-view';

export interface AppState {
  product: ProductState;
  topProducts: TopProductsState;
  storedProduct: StoredProductState;
  lang: Lang;
  productsView: ProductsView;
}
