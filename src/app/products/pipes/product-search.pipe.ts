import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/shared/models/product';

@Pipe({
  name: 'productSearch'
})
export class ProductSearchPipe implements PipeTransform {
  transform(products: Product[], query: string | undefined): Product[] {
    if (!query) {
      return products;
    }

    return products.filter(
      (product: Product) =>
        product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
}
