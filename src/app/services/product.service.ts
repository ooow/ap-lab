import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Product } from '../models/product';
import { getProducts } from '../mocks/products';
import { delay } from 'rxjs/operators';
import { Lang } from '../models/lang';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  getProducts(lang: Lang): Observable<Array<Product>> {
    return of(getProducts(lang)).pipe(delay(1000));
  }
}
