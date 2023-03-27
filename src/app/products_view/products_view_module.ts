import {ClipboardModule} from '@angular/cdk/clipboard';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTooltipModule} from '@angular/material/tooltip';
import {RouterModule} from '@angular/router';
import {A11yModule} from '@angular/cdk/a11y';
import {ReactiveFormsModule} from '@angular/forms';
import {MatDividerModule} from '@angular/material/divider';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import {LoaderModule} from 'src/app/shared/component/loader/loader.module';
import {ProductDetailsDialog} from './product_details_dialog/product_details_dialog';
import {ProductTableComponent} from './product_table/product_table';
import {ProductCard} from './product_card/product_card';
import {ProductSearchPipe} from './pipe/product_search_pipe';
import {ProductsView} from './products_view';
import {ProductDeleteDialog} from './product_delete_dialog/product_delete_dialog';
import {CreateProductDialog} from './create_product_dialog/create_product_dialog';

const routes = [{path: 'products', component: ProductsView}];

@NgModule({
  declarations: [
    CreateProductDialog,
    ProductCard,
    ProductDeleteDialog,
    ProductDetailsDialog,
    ProductSearchPipe,
    ProductsView,
    ProductTableComponent,
  ], imports  : [
    A11yModule,
    ClipboardModule,
    CommonModule,
    LoaderModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
  ], providers: [MatSnackBar],
})
export class ProductsViewModule {}
