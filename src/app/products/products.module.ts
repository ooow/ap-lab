import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';

import { LoaderModule } from 'src/app/shared/modules/loader/loader.module';
import { IfViewModeDirective } from 'src/app/shared/directives/if-view-mode.directive';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductComponent } from './components/product/product.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { ProductsComponent } from './products.component';
import { ProductCardsComponent } from './components/product-cards/product-cards.component';

const routes = [{ path: 'products', component: ProductsComponent }];

@NgModule({
  declarations: [
    ProductsComponent,
    ProductCardsComponent,
    ProductComponent,
    ProductDetailsModalComponent,
    ProductSearchPipe,
    ProductTableComponent,
    IfViewModeDirective,
    
  ],
  imports: [
    ClipboardModule,
    CommonModule,
    LoaderModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    RouterModule.forChild(routes)
  ],
  providers: [MatSnackBar]
})
export class ProductsModule {}
