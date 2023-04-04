import { ProductQuantityInfo } from './product_quantity_info';

export interface Product {
  id?: number;
  name: string;
  description: string;
  picture: string;
  counts?: ProductQuantityInfo[];
}
