import { Product } from './product';

export interface ProductState {
  topProducts: Array<Product>;
  products: Array<Product>;
  search: string;
  pageIndex: number;
  totalNumber: number;
}
