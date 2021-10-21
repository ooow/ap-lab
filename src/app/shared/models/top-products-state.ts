import { Product } from 'src/app/shared/models/product';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export interface TopProductsState {
  topProducts: Array<Product>;
  isLoading: boolean;
  error: BackendErrorsInterface | null;
}
