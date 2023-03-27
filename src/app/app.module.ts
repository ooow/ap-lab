import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {RouterModule, Routes} from '@angular/router';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';

import {AppComponent} from 'src/app/app.component';
import {DashboardModule} from 'src/app/dashboard_view/dashboard.module';
import {ProductsViewModule} from 'src/app/products_view/products_view_module';
import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {HeaderModule} from 'src/app/shared/component/header/header.module';
import {reducer as LangReducer} from 'src/app/store/lang/lang.reducers';
import {GetProductEffect} from 'src/app/store/product/effects/get-product.effect';
import {reducer as ProductReducer} from 'src/app/store/product/product.reducers';
import {CreateProductEffect} from 'src/app/store/stored-product/effects/create-product.effect';
import {DeleteProductEffect} from 'src/app/store/stored-product/effects/delete-product.effect';
import {reducer as StoredProductReducer} from 'src/app/store/stored-product/stored-product.reducers';
import {GetTopProductsEffect} from 'src/app/store/top-products/effects/get-top-products.effect';
import {reducer as TopProductsReducer} from 'src/app/store/top-products/top-products.reducers';
import {LANGUAGES_TOKEN} from 'src/app/store/token/languages.token';

const routes: Routes = [
  {path: '', redirectTo: 'products', pathMatch: 'full'},
];

@NgModule({
  declarations: [AppComponent],
  imports     : [
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    HeaderModule,
    ProductsViewModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      lang         : LangReducer,
      product      : ProductReducer,
      topProducts  : TopProductsReducer,
      storedProduct: StoredProductReducer,
    }),
    EffectsModule.forRoot([
      GetProductEffect,
      GetTopProductsEffect,
      CreateProductEffect,
      DeleteProductEffect,
    ]),
  ],
  providers   : [
    {
      provide : LANGUAGES_TOKEN,
      useValue: [Language.en, Language.ru],
    },
  ],
  bootstrap   : [AppComponent],
})
export class AppModule {}
