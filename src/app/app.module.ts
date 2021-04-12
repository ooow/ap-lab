import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { AppComponent } from './app.component';
import { LangSelectorOptionComponent } from './components/lang-selector-option/lang-selector-option.component';
import { LangSelectorComponent } from './components/lang-selector/lang-selector.component';
import { ProductComponent } from './components/product/product.component';
import { SearchComponent } from './components/search/search.component';
import { Lang } from './models/lang';
import { ProductSearchPipe } from './pipes/product-search.pipe';
import { SearchOptionsPipe } from './pipes/search-options.pipe';
import { reducer as LangReducer } from './store/lang/lang.reducers';
import { reducer as ProductReducer } from './store/product/product.reducers';
import { LANGUAGES_TOKEN } from './tokens/languages.token';

@NgModule({
  declarations: [
    AppComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent,
    ProductComponent,
    ProductSearchPipe,
    SearchComponent,
    SearchComponent,
    SearchOptionsPipe
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      product: ProductReducer,
      lang: LangReducer
    })
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
