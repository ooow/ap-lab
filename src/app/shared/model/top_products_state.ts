import {Product} from 'src/app/shared/model/product';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export interface TopProductsState {
  topProducts: Product[];
  isLoading: boolean;
  error: BackendErrorsInterface | null;
}
