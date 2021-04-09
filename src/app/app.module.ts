import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProductComponent } from './components/product/product.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from './components/search/search.component';
import { MatDividerModule } from '@angular/material/divider';
import { StoreModule } from '@ngrx/store';
import { reducer as ProductReducer } from './store/product/product.reducers';
import { reducer as LangReducer } from './store/lang/lang.reducers';
import { SearchOptionsPipe } from './pipes/search-options.pipe';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { MatSelectModule } from '@angular/material/select';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent,
    ProductComponent,
    ProductSearchPipe,
    SearchComponent,
    SearchComponent,
    SearchOptionsPipe,
    LangSelectorComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      product: ProductReducer,
      lang: LangReducer,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
