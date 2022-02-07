import { DashboardProductsService } from './../../shared/services/dashboard-products.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { Product } from 'src/app/shared/models/product';

@Pipe({
  name: 'barChartProductData'
})
export class BarChartProductDataPipe implements PipeTransform {
  constructor(private dashboardProducts: DashboardProductsService) {}
  transform(products: Product[]): ChartDataType {
    const fieldNames = ['Location', 'Price USD'];

    const countsNoDuplicates = this.dashboardProducts.removeDuplicatedProductsByLocationAndPrice(
      products
    );
    const data = countsNoDuplicates
      .map(({ location, price }): [string, number] => [location, price])
      .sort((a, b) => a[1] - b[1]);

    return { fieldNames, data };
  }
}
