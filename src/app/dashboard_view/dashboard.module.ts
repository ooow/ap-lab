import {CommonModule} from '@angular/common';
import {MatDividerModule} from '@angular/material/divider';
import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';

import {BarChartProductDataPipe} from 'src/app/dashboard_view/pipes/bar-chart-product-data.pipe';
import {ChartComponent} from 'src/app/dashboard_view/components/chart/chart.component';
import {DashboardComponent} from 'src/app/dashboard_view/dashboard.component';
import {LoaderModule} from 'src/app/shared/component/loader/loader.module';
import {PieChartProductDataPipe} from 'src/app/dashboard_view/pipes/pie-chart-product-data.pipe';

const routes = [{path: 'dashboard', component: DashboardComponent}];

@NgModule({
  declarations: [
    BarChartProductDataPipe,
    ChartComponent,
    DashboardComponent,
    PieChartProductDataPipe,
  ], imports  : [
    CommonModule, MatDividerModule, LoaderModule, RouterModule.forChild(routes),
  ],
})
export class DashboardModule {}
