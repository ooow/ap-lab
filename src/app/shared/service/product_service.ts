import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {delay, map} from 'rxjs/operators';

import {getProducts} from 'src/app/products_view/mock/products';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';
import {ProductsResp} from 'src/app/shared/model/products_resp';
import {PersistenceService} from 'src/app/shared/service/persistence_service';

export type CreateProductResponseType = {
  product: Product;
};

@Injectable({providedIn: 'root'})
export class ProductService {
  constructor(private persistenceService: PersistenceService) {}

  getProducts(lang: Language, pageIndex: number,
    size = 10): Observable<ProductsResp> {
    const productKey = `product-${lang}`;
    const fetchedProducts = getProducts(lang);
    return this.persistenceService.get<Product>(productKey)
      .pipe(delay(1000), map((response) => {
        const localStorageProducts = response?.length ? response.map(
          ({data, id}) => ({...data, id})) : [];
        const mergedProducts = [...localStorageProducts, ...fetchedProducts];
        const start = pageIndex * size;
        return {
          products   : mergedProducts.slice(start, start + size),
          totalNumber: mergedProducts.length,
        };
      }));
  }

  createProduct(product: Product,
    lang: Language): Observable<CreateProductResponseType> {
    const key = `product-${lang}`;
    return this.persistenceService.add(key, product)
      .pipe(delay(1000), map(({id, data}) => ({
        product: {...data, id},
      })));
  }

  deleteProduct(product: Product,
    lang: Language): Observable<CreateProductResponseType> {
    const key = `product-${lang}`;
    return this.persistenceService.remove<Product>(key, product.id)
      .pipe(delay(1000), map((response) => ({
        product: {...response.data, id: response.id},
      })));
  }
}
