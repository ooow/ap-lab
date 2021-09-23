import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Lang } from 'src/app/shared/models/lang';
import { ProductsResp } from 'src/app/products/models/products-resp';
import { BehaviorSubject, combineLatest, Observable, of, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProductService } from 'src/app/products/services/product.service';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import { Product } from 'src/app/products/models/product';
import { PieChartConfigsType } from 'src/app/dashboard/components/pie-chart/pie-chart.types';

@Component({
  selector: 'tk-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  private products$: Observable<Product[]> = this.store.select(
    ProductSelectors.products
  );

  readonly product$: Observable<Product | null> = combineLatest([
    this.search$,
    this.products$
  ]).pipe(
    switchMap(([search, products]: [string, Product[]]) => {
      const searchResult =
        search &&
        products.find(
          (product) =>
            product.name.toLowerCase().indexOf(search.toLowerCase()) !== -1
        );
      return of(searchResult || null);
    })
  );

  readonly loading$ = new BehaviorSubject<boolean>(true);
  private readonly destroy$ = new Subject<void>();

  chartConfigs: PieChartConfigsType = {
    title: '',
    width: 800,
    height: 600,
    pieSliceText: 'value'
  };

  constructor(private store: Store, productService: ProductService) {
    this.lang$
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((lang: Lang) => productService.getProducts(lang, 0, -1)),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((resp: ProductsResp) => {
        this.store.dispatch(ProductActions.retrieveProducts(resp));
        this.store.dispatch(
          ProductActions.search({ search: resp.products[0].name })
        );
        this.loading$.next(false);
      });

    combineLatest([this.product$, this.lang$])
      .pipe(takeUntil(this.destroy$))
      .subscribe(([product, lang]: [Product, Lang]) => {
        if (product) {
          const { name } = product;
          switch (lang) {
            case Lang.en:
              this.chartConfigs.title = `${name} available by location`;
              break;
            case Lang.ru:
              this.chartConfigs.title = `${name}: доступное колличество по локации`;
              break;
            default:
              break;
          }
        }
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
