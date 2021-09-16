import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { getProducts } from '../mocks/products';
import { Lang } from '../../shared/models/lang';
import { ProductsResp } from '../models/products-resp';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  getProducts(
    lang: Lang,
    pageIndex: number,
    size = 10
  ): Observable<ProductsResp> {
    const allProducts = getProducts(lang);
    const start = pageIndex * size;

    return of({
      products: allProducts.slice(start, start + size),
      totalNumber: allProducts.length
    }).pipe(delay(1000));
  }
}
