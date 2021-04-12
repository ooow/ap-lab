import { Lang } from './lang';
import { ProductState } from './product-state';

export interface AppState {
  product: ProductState;
  lang: Lang;
}
