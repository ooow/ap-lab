import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDividerModule } from '@angular/material/divider';
import { MatOptionModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { LangSelectorOptionComponent } from './shared/components/lang-selector-option/lang-selector-option.component';
import { LangSelectorComponent } from './shared/components/lang-selector/lang-selector.component';
import { Lang } from './shared/models/lang';
import { reducer as LangReducer } from './shared/store/lang/lang.reducers';
import { LANGUAGES_TOKEN } from './tokens/languages.token';
import { ProductsModule } from './products/products.module';
import { LoaderComponent } from './shared/components/loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    LangSelectorComponent,
    LangSelectorOptionComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatAutocompleteModule,
    MatDividerModule,
    MatFormFieldModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSelectModule,
    ProductsModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      lang: LangReducer
    }),
    RouterModule.forRoot([])
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
