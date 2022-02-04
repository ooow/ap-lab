import { CommonModule } from '@angular/common';
import { MatDividerModule } from '@angular/material/divider';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BarChartProductDataPipe } from 'src/app/dashboard/pipes/bar-chart-product-data.pipe';
import { ChartComponent } from 'src/app/dashboard/components/chart/chart.component';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';
import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { ProductsModule } from '../products/products.module';

const routes = [{ path: 'dashboard', component: DashboardComponent }];

@NgModule({
  declarations: [
    BarChartProductDataPipe,
    ChartComponent,
    DashboardComponent,
    PieChartProductDataPipe
  ],
  imports: [
    CommonModule,
    MatDividerModule,
    LoaderModule,
    ProductsModule,
    RouterModule.forChild(routes)
  ]
})
export class DashboardModule {}
