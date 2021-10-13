import { CreateProductState } from 'src/app/shared/models/create-product-state';
import { Lang } from 'src/app/shared/models/lang';
import { ProductState } from 'src/app/shared/models/product-state';
import { TopProductsState } from 'src/app/shared/models/top-products-state';

export interface AppState {
  product: ProductState;
  topProducts: TopProductsState;
  createProduct: CreateProductState;
  lang: Lang;
}
