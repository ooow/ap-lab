import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getProducts } from '../mocks/products';
import { Lang } from '../models/lang';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(lang: Lang): Observable<ReadonlyArray<Product>> {
    return of(getProducts(lang)).pipe(delay(1000));
  }
}
