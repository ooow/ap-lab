import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { DashboardComponent } from 'src/app/dashboard/dashboard.component';
import { ChartComponent } from 'src/app/dashboard/components/chart/chart.component';
import { MatDividerModule } from '@angular/material/divider';
import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';
import { PieChartProductDataPipe } from 'src/app/dashboard/pipes/pie-chart-product-data.pipe';
import { BarChartProductDataPipe } from 'src/app/dashboard/pipes/bar-chart-product-data.pipe';

const routes = [{ path: 'dashboard', component: DashboardComponent }];

@NgModule({
  declarations: [
    DashboardComponent,
    ChartComponent,
    PieChartProductDataPipe,
    BarChartProductDataPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatDividerModule,
    LoaderModule
  ]
})
export class DashboardModule {}
