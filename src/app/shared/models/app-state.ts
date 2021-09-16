import { Lang } from './lang';
import { ProductState } from '../../products/models/product-state';

export interface AppState {
  product: ProductState;
  lang: Lang;
}
