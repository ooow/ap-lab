import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { reducer } from './store/product/product.reducers';

const routes = [{ path: 'products', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductDetailsModalComponent,
    ProductSearchPipe,
    ProductTableComponent
  ],
  imports: [
    ClipboardModule,
    CommonModule,
    LoaderModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('product', reducer)
  ]
})
export class ProductsModule {}
