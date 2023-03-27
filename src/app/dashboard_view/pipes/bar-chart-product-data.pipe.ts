import {Pipe, PipeTransform} from '@angular/core';
import {ChartDataType} from 'src/app/dashboard_view/components/chart/chart.types';
import {Product} from 'src/app/shared/model/product';

@Pipe({
  name: 'barChartProductData',
})
export class BarChartProductDataPipe implements PipeTransform {
  transform(product: Product): ChartDataType {
    const fieldNames = ['Location', 'Price USD'];
    const data = product.counts
      .map(({location, price}): [string, number] => [location, price])
      .sort((a, b) => a[1] - b[1]);

    return {fieldNames, data};
  }
}
