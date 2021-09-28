import { ClipboardModule } from '@angular/cdk/clipboard';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LangSelectorOptionComponent } from './components/lang-selector-option/lang-selector-option.component';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { Lang } from './models/lang';
import { LANGUAGES_TOKEN } from './tokens/languages.token';
import { ProductComponent } from './components/product/product.component';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { ProductTableComponent } from './components/product-table/product-table.component';
import { ProductDetailsModalComponent } from './components/product-details-modal/product-details-modal.component';
import { reducer as LangReducer } from './store/lang/lang.reducers';
import { reducer as ProductReducer } from './store/product/product.reducers';
import { SearchComponent } from './components/search/search.component';
import { SearchOptionsPipe } from './pipes/search-options.pipe';
import { MatSnackBar } from '@angular/material/snack-bar';

@NgModule({
  declarations: [
    AppComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent,
    ProductComponent,
    ProductSearchPipe,
    ProductDetailsModalComponent,
    ProductTableComponent,
    SearchComponent,
    SearchComponent,
    SearchOptionsPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    ClipboardModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    MatSortModule,
    MatTableModule,
    MatTooltipModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      product: ProductReducer,
      lang: LangReducer
    })
  ],
  providers: [
    { provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] },
    MatSnackBar
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
