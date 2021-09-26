import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';

import { AppComponent } from './app.component';
import { Lang } from './shared/models/lang';
import { reducer as LangReducer } from './shared/store/lang/lang.reducers';
import { LANGUAGES_TOKEN } from './shared/tokens/languages.token';
import { ProductsModule } from './products/products.module';
import { HeaderModule } from 'src/app/shared/modules/header/header.module';
import { DashboardModule } from 'src/app/dashboard/dashboard.module';

const routes: Routes = [
  { path: '', redirectTo: 'products', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MatProgressSpinnerModule,
    ProductsModule,
    HeaderModule,
    DashboardModule,
    ReactiveFormsModule,
    StoreModule.forRoot({
      lang: LangReducer
    }),
    RouterModule.forRoot(routes)
  ],
  providers: [{ provide: LANGUAGES_TOKEN, useValue: [Lang.en, Lang.ru] }],
  bootstrap: [AppComponent]
})
export class AppModule {}
