import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from 'src/app/app.component';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { Lang } from 'src/app/shared/models/lang';
import { LANGUAGES_TOKEN } from 'src/app/shared/tokens/languages.token';
import { ProductsModule } from 'src/app/products/products.module';
import { reducer as LangReducer } from 'src/app/shared/store/lang/lang.reducers';

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
      lang: LangReducer
    })
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
