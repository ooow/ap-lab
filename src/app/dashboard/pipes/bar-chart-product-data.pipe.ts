import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';

@Pipe({
  name: 'barChartProductData'
})
export class BarChartProductDataPipe implements PipeTransform {
  transform(product: Product): ChartDataType {
    const fieldNames = ['Location', 'Price USD'];
    const data = product.counts
      .map(({ location, price }): [string, number] => [location, price])
      .sort((a, b) => a[1] - b[1]);

    return { fieldNames, data };
  }
}
