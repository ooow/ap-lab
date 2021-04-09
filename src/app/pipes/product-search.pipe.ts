import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../models/product';

@Pipe({
  name: 'productSearch',
})
export class ProductSearchPipe implements PipeTransform {
  transform(products: Product[], query: string): Product[] {
    if (!query) {
      return products;
    }

    return products.filter(
      (product) =>
        product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
}
