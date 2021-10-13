import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  set<T>(key: string, data: T): Observable<{ data: T }> {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return of({ data });
    } catch (error) {
      return throwError({ message: 'Request failed', error });
    }
  }

  get<T>(key: string): Observable<{ data: T }> {
    try {
      return of({ data: JSON.parse(localStorage.getItem(key) as string) });
    } catch (error) {
      return throwError({ message: 'Request failed', error });
    }
  }

  add<T>(key: string, data: T): Observable<{ data: T }> {
    try {
      const retrievedData = JSON.parse(localStorage.getItem(key) as string);
      if (retrievedData && Array.isArray(retrievedData)) {
        retrievedData.unshift(data);
        localStorage.setItem(key, JSON.stringify(retrievedData));
        return of({ data });
      } else if (!retrievedData) {
        this.set(key, [data]);
        return of({ data });
      } else {
        throw {
          message: 'Data cannot be added to the existing data type'
        };
      }
    } catch (error) {
      return throwError({ message: 'Request failed', error });
    }
  }
}
