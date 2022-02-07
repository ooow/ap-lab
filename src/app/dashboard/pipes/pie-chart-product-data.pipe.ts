import { DashboardProductsService } from './../../shared/services/dashboard-products.service';
import { Pipe, PipeTransform } from '@angular/core';
import { ChartDataType } from 'src/app/dashboard/components/chart/chart.types';
import { Product } from 'src/app/shared/models/product';

@Pipe({
  name: 'pieChartProductData'
})
export class PieChartProductDataPipe implements PipeTransform {
  constructor(private dashboardProducts: DashboardProductsService) {}
  transform(products: Product[]): ChartDataType {
    const fieldNames = ['Location', 'Quantity'];

    const reducedByLocation = this.dashboardProducts.sumQunatityAvailableByLocation(
      products
    );

    const data = reducedByLocation.map(({ location, quantityAvailable }) => [
      location,
      quantityAvailable
    ]);

    return { fieldNames, data };
  }
}
