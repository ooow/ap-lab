import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

import { getProducts } from 'src/app/products/mocks/products';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import { ProductsResp } from 'src/app/shared/models/products-resp';
import { PersistenceService } from 'src/app/shared/services/persistence/persistence.service';
import { CreateProductResponseType } from 'src/app/shared/types/create-product-response.type';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  constructor(private persistenceService: PersistenceService) {}

  getProducts(
    lang: Lang,
    pageIndex: number,
    size = 10
  ): Observable<ProductsResp> {
    const productKey = `product-${lang}`;
    const locallyStoredProducts = this.persistenceService.get(productKey) || [];
    const fetchedProducts = getProducts(lang);
    const allProducts = [...locallyStoredProducts, ...fetchedProducts];
    const start = pageIndex * size;

    return of({
      products: allProducts.slice(start, start + size),
      totalNumber: allProducts.length
    }).pipe(delay(1000));
  }

  createProduct(
    product: Partial<Product>,
    lang: Lang
  ): Observable<CreateProductResponseType> {
    const key = `product-${lang}`;
    return of(this.persistenceService.add(key, product)).pipe(
      delay(1000),
      map((res) => {
        if (res.success) {
          return { message: `${product.name} was successfully created` };
        }
        if (res.error) {
          return { message: `Creating ${product.name} failed` };
        }
      })
    );
  }
}
