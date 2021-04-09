import { ProductState } from './product-state';
import { Lang } from './lang';

export interface AppState {
  product: ProductState;
  lang: Lang;
}
