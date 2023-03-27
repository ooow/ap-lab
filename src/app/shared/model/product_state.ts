import {Product} from 'src/app/shared/model/product';
import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export interface ProductState {
  products: Product[];
  search: string;
  pageIndex: number;
  totalNumber: number;
  isLoading: boolean;
  error: BackendErrorsInterface | null;
}
