import { Subject } from 'rxjs';
import { Product } from './product';

export interface ProductDeleteConfirmation {
  product: Product;
  initiateClose: Subject<boolean>;
}
