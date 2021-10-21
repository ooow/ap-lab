import { BackendErrorsInterface } from 'src/app/shared/types/backend-errors.interface';

export type StoredProductState = {
  isLoading: boolean;
  message: string;
  error: BackendErrorsInterface | null;
};
