import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from 'src/app/app.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { ProductsModule } from 'src/app/products/products.module';
import { Lang } from 'src/app/shared/models/lang';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { reducer as CreateProductReducer } from 'src/app/shared/store/create-product/create-product.reducers';
import { CreateProductEffect } from 'src/app/shared/store/create-product/effects/create-product.effect';
import { reducer as LangReducer } from 'src/app/shared/store/lang/lang.reducers';
import { GetProductEffect } from 'src/app/shared/store/product/effects/get-product.effect';
import { reducer as ProductReducer } from 'src/app/shared/store/product/product.reducers';
import { GetTopProductsEffect } from 'src/app/shared/store/top-products/effects/get-top-products.effect';
import { reducer as TopProductsReducer } from 'src/app/shared/store/top-products/top-products.reducers';
import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    DashboardModule,
    HeaderModule,
    ProductsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    StoreModule.forRoot({
      lang: LangReducer,
      product: ProductReducer,
      topProducts: TopProductsReducer,
      createProduct: CreateProductReducer
    }),
    EffectsModule.forRoot([
      GetProductEffect,
      GetTopProductsEffect,
      CreateProductEffect
    ])
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
