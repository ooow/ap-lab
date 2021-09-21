import { Pipe, PipeTransform } from '@angular/core';
import { Product } from 'src/app/products/models/product';
import { ChartDataType } from 'src/app/dashboard/components/pie-chart/pie-chart.types';

@Pipe({
  name: 'productChartData'
})
export class ProductChartDataPipe implements PipeTransform {
  transform(products: Product[], query: string): ChartDataType {
    const selectedProduct = products.find(
      (product: Product) => product.name.toLowerCase() === query.toLowerCase()
    );
    const fieldNames: [string, string] = ['Location', 'Quantity'];
    const chartData: [
      string,
      number
    ][] = selectedProduct.counts.map(({ location, quantityAvailable }) => [
      location,
      Number(quantityAvailable)
    ]);
    return { fieldNames, data: [...chartData] };
  }
}
