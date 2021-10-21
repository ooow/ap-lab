import { Product } from 'src/app/shared/models/product';
import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export interface ProductState {
  products: Array<Product>;
  search: string;
  pageIndex: number;
  totalNumber: number;
  isLoading: boolean;
  error: BackendErrorsInterface | null;
}
