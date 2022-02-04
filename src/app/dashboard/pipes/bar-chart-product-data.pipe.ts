import { Pipe, PipeTransform } from '@angular/core';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { Product } from 'src/app/shared/models/product';

@Pipe({
  name: 'barChartProductData'
})
export class BarChartProductDataPipe implements PipeTransform {
  transform(products: Product[]): ChartDataType {
    const fieldNames = ['Location', 'Price USD'];

    const productsCounts = products.map((product) => [...product.counts]);
    const concatedCounts = [].concat.apply([], productsCounts);

    const countsNoDuplicates = concatedCounts.filter((value, index) => {
      const _value = JSON.stringify(value);
      return (
        index ===
        concatedCounts.findIndex((obj) => {
          return JSON.stringify(obj) === _value;
        })
      );
    });

    const data = countsNoDuplicates
      .map(({ location, price }): [string, number] => [location, price])
      .sort((a, b) => a[1] - b[1]);

    return { fieldNames, data };
  }
}
