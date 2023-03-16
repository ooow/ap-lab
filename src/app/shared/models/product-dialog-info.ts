import { Subject } from 'rxjs';
import { Product } from './product';

export interface ProductDialogInfo {
  product: Product;
  initiateClose?: Subject<boolean>;
  deleteProduct?: Subject<boolean>;
}
