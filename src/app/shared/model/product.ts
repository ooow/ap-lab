import { ProductQuantityInfo } from './product-quantity-info';

export interface Product {
  id?: number;
  name: string;
  description: string;
  picture: string;
  counts?: ProductQuantityInfo[];
}
