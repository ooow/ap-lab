import { Product } from './product';

export interface ProductsResp {
  products: ReadonlyArray<Product>;
  totalNumber: number;
}
