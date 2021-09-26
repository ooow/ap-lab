import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { LoaderComponent } from '../shared/components/loader/loader.component';
import { ProductsComponent } from './products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { reducer } from './store/product/product.reducers';

const routes = [{ path: 'products', component: ProductsComponent }];

@NgModule({
  declarations: [
    LoaderComponent,
    ProductsComponent,
    ProductComponent,
    ProductDetailsModalComponent,
    ProductSearchPipe,
    ProductTableComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('product', reducer)
  ]
})
export class ProductsModule {}
