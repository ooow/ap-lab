import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { StoreModule } from '@ngrx/store';

import { ProductsComponent } from './products.component';
import { ProductComponent } from './components/product/product.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { SearchComponent } from './components/search/search.component';
import { reducer } from './store/product/product.reducers';
import { ProductSearchPipe } from './pipes/product-search.pipe';

import { SearchOptionsPipe } from './pipes/search-options.pipe';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { LoaderComponent } from '../shared/components/loader/loader.component';

const routes = [{ path: 'products', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductComponent,
    SearchComponent,
    ProductTableComponent,
    ProductDetailsModalComponent,
    SearchComponent,
    ProductSearchPipe,
    SearchOptionsPipe,
    LoaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatInputModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    MatSortModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('product', reducer),
    ReactiveFormsModule,
    MatAutocompleteModule
  ]
})
export class ProductsModule {}
