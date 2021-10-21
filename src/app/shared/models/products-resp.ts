import { Product } from 'src/app/shared/models/product';

export interface ProductsResp {
  products: Array<Product>;
  totalNumber: number;
}
