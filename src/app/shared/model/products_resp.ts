import {Product} from 'src/app/shared/model/product';

export interface ProductsResp {
  products: Product[];
  totalNumber: number;
}
