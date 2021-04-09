import { Product } from './product';

export interface ProductState {
  products: Array<Product>;
  search: string;
}
