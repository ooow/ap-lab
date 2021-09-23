import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';

@Pipe({
  name: 'pieChartProductData'
})
export class PieChartProductDataPipe implements PipeTransform {
  transform(product: Product): ChartDataType {
    const fieldNames = ['Location', 'Quantity'];
    const data = product.counts.map(({ location, quantityAvailable }) => [
      location,
      quantityAvailable
    ]);

    return { fieldNames, data };
  }
}
