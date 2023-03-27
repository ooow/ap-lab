import {BackendErrorsInterface} from 'src/app/shared/model/backend_errors';

export type StoredProductState = {
  isLoading: boolean; message: string; error: BackendErrorsInterface | null;
};
