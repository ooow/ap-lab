import { Pipe, PipeTransform } from '@angular/core';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { Product } from 'src/app/shared/models/product';

@Pipe({
  name: 'pieChartProductData'
})
export class PieChartProductDataPipe implements PipeTransform {
  transform(products: Product[]): ChartDataType {
    const fieldNames = ['Location', 'Quantity'];

    const productsCounts = products.map((product) => [...product.counts]);
    const concatedCounts = [].concat.apply([], productsCounts);

    const reducedByLoction = Array.from(
      concatedCounts.reduce(
        (m, { location, quantityAvailable }) =>
          m.set(location, (m.get(location) || 0) + quantityAvailable),
        new Map()
      ),
      ([location, quantityAvailable]) => ({ location, quantityAvailable })
    );

    const data = reducedByLoction.map(({ location, quantityAvailable }) => [
      location,
      quantityAvailable
    ]);

    return { fieldNames, data };
  }
}
