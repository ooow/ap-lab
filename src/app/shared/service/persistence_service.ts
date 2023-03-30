import {Injectable} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';

type StoredDataType<T> = {
  data: T; id: number;
};

@Injectable({
  providedIn: 'root',
})
export class PersistenceService {
  set<T>(key: string, data: T): Observable<T> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return of(data);
    } catch (error) {
      return throwError(()=>({message: 'Request failed', error}));
    }
  }

  get<T>(key: string): Observable<StoredDataType<T>[] | null> {
    try {
      return of(JSON.parse(localStorage.getItem(key) as string));
    } catch (error) {
      return throwError(()=>({message: 'Request failed', error}));
    }
  }

  add<T>(key: string, data: T): Observable<StoredDataType<T>> {
    try {
      const retrievedData: StoredDataType<T>[] = JSON.parse(
        localStorage.getItem(key) as string);
      const dataIndex = retrievedData?.length ? retrievedData[0].id + 1 : 1;
      const indexedData = {id: dataIndex, data};
      if (retrievedData && Array.isArray(retrievedData)) {
        retrievedData.unshift(indexedData);
        this.set(key, retrievedData);
        return of(indexedData);
      }
      if (!retrievedData) {
        this.set(key, [indexedData]);
        return of(indexedData);
      }
      throw {
        message: 'Data cannot be added to the existing data type',
      };
    } catch (error) {
      return throwError(()=>({message: 'Request failed', error}));
    }
  }

  remove<T>(key: string, id: number): Observable<StoredDataType<T>> {
    try {
      const retrievedData: StoredDataType<T>[] = JSON.parse(
        localStorage.getItem(key) as string);

      if (retrievedData && Array.isArray(retrievedData)) {
        const dataItemToDelete = retrievedData.find(
          (dataItem) => dataItem.id === id);
        if (dataItemToDelete) {
          const updatedData = retrievedData.filter(
            (dataItem) => dataItem.id !== id);
          this.set(key, updatedData);
          return of(dataItemToDelete);
        }
        throw {message: 'Value does not exist'};
      }
      if (!retrievedData) {
        throw {
          message: 'Provided invalid key',
        };
      }
      throw {message: 'Something went wrong'};
    } catch (error) {
      return throwError(()=>({message: 'Request failed', error}));
    }
  }
}
