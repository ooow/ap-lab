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
import { reducer as LangReducer } from 'src/app/shared/store/lang/lang.reducers';
import { GetProductEffect } from 'src/app/shared/store/product/effects/get-product.effect';
import { GetTopProductsEffect } from 'src/app/shared/store/product/effects/get-top-products.effect';
import { reducer as productReducer } from 'src/app/shared/store/product/product.reducers';
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
      product: productReducer
    }),
    EffectsModule.forFeature([GetProductEffect, GetTopProductsEffect])
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
