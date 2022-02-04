import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil } from 'rxjs/operators';

import {
  ChartConfigsType,
  ChartType
} from 'src/app/dashboard/components/chart/chart.types';
import { Lang } from 'src/app/shared/models/lang';
import { Product } from 'src/app/shared/models/product';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import { getProductsAction } from 'src/app/shared/store/product/actions/get-products.actions';
import { searchProductAction } from 'src/app/shared/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/shared/store/product/product.selectors';

@Component({
  selector: 'tk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnDestroy, OnInit {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  readonly isLoading$: Observable<boolean> = this.store.select(
    ProductSelectors.isLoading
  );

  readonly pieChartConfigs: ChartConfigsType = {
    title: '',
    width: 700,
    height: 400,
    pieSliceText: 'value'
  };
  readonly barChartConfigs: ChartConfigsType = {
    title: '',
    width: 600,
    height: 400
  };
  readonly ChartType = ChartType;

  private products$: Observable<Product[]> = this.store.pipe(
    select(ProductSelectors.products),
    map((products) => products.filter((product) => product.counts))
  );

  // readonly product$: Observable<Product | null> = combineLatest([
  //   this.search$,
  //   this.products$
  // ]).pipe(
  //   switchMap(([search, products]: [string, Product[]]) => {
  //     const searchResult =
  //       search && products.find((product) => product.name === search);
  //     return of(searchResult || null);
  //   })
  // );
  readonly product$: Observable<Product[] | null> = combineLatest([
    this.search$,
    this.products$
  ]).pipe(
    switchMap(([search, products]: [string, Product[]]) => {
      const searchResult =
        search && products.filter((product) => product.name === search);
      return of(searchResult || null);
    })
  );

  private readonly destroy$ = new Subject<void>();

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.updateProductsOnLangEmit();
    this.updateSearchOnProductsEmit();
    this.updateChartConfigsTitle();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  showEmittedData(value:{'location':string}){
    console.log(value)
  }

  updateProductsOnLangEmit(): void {
    this.lang$.pipe(takeUntil(this.destroy$)).subscribe((lang) => {
      this.store.dispatch(getProductsAction({ lang, pageIndex: 0 }));
    });
  }

  updateSearchOnProductsEmit(): void {
    this.products$.pipe(takeUntil(this.destroy$)).subscribe((products) => {
      this.store.dispatch(searchProductAction({ search: products[0]?.name }));
    });
  }

  updateChartConfigsTitle(): void {
    combineLatest([this.product$, this.lang$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([product, lang]: [Product[], Lang]) => {
        if (product) {
          const { name } = product[0];
          switch (lang) {
            case Lang.en:
              this.pieChartConfigs.title = `${name} available by location`;
              this.barChartConfigs.title = `${name} pricing model per item `;
              break;
            case Lang.ru:
              this.pieChartConfigs.title = `${name}: доступное количество по локациям`;
              this.barChartConfigs.title = `${name}: стоимость за единицу в зависимости от региона`;
              break;
            default:
              break;
          }
        }
      });
  }
}
