import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { StoreModule } from '@ngrx/store';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { reducer } from './store/product/product.reducers';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';

const routes = [{ path: 'products', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    ProductTableComponent,
    ProductDetailsModalComponent,
    ProductSearchPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('product', reducer)
  ]
})
export class ProductsModule {}
