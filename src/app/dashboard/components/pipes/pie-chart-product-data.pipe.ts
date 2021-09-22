import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { PieChartDataType } from 'src/app/dashboard/components/pie-chart/pie-chart.types';

@Pipe({
  name: 'pieChartProductData'
})
export class PieChartProductDataPipe implements PipeTransform {
  transform(product: Product): PieChartDataType {
    const fieldNames: [string, string] = ['Location', 'Quantity'];
    const data: Array<
      [string, number]
    > = product.counts.map(({ location, quantityAvailable }) => [
      location,
      Number(quantityAvailable)
    ]);

    return { fieldNames, data };
  }
}
