import { Injectable } from '@angular/core';
import { PersistenceMethodReturnType } from 'src/app/shared/services/persistence/persistence.types';

@Injectable({
  providedIn: 'root'
})
export class PersistenceService {
  set(key: string, data: any): PersistenceMethodReturnType {
    try {
      localStorage.setItem(key, JSON.stringify(data));
      return { success: true };
    } catch (e) {
      return { success: false, error: e };
    }
  }

  get(key: string): any {
    try {
      return JSON.parse(localStorage.getItem(key) as string);
    } catch (e) {
      console.error('Error getting data from localStorage', e);
      return null;
    }
  }

  add(key: string, data: any): PersistenceMethodReturnType {
    try {
      const retrievedData = JSON.parse(localStorage.getItem(key) as string);
      if (retrievedData && Array.isArray(retrievedData)) {
        retrievedData.unshift(data);
        localStorage.setItem(key, JSON.stringify(retrievedData));
        return { success: true };
      }
      if (!retrievedData) {
        return this.set(key, [data]);
      }
      return {
        success: false,
        /* tslint:disable */
        error: "Data can't be added to the existing data type"
      };
    } catch (e) {
      return { success: false, error: e };
    }
  }
}
