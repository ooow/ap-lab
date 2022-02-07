import { Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { combineLatest, Observable, of, Subject, BehaviorSubject } from 'rxjs';
import { map, switchMap, takeUntil, tap, filter } from 'rxjs/operators';

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
import { changePageAction } from '../shared/store/product/actions/change-page.action';

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
  readonly pageIndex$: Observable<number> = this.store.select(
    ProductSelectors.pageIndex
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

  private selectedLocation$ = new BehaviorSubject(null);

  private products$: Observable<Product[]> = this.store.pipe(
    select(ProductSelectors.products),
    map((products) => products.filter((product) => product.counts))
  );

  readonly product$: Observable<Product[] | null> = combineLatest([
    this.search$,
    this.products$
  ]).pipe(
    switchMap(([search, products]: [string, Product[]]) => {
      const searchResult =
        search && products.filter((product) => product.name === search);
      return of(searchResult || null);
    }),
    tap((products) => {
      if (products) {
        const productsCounts = products.map((product) => [...product.counts]);
        const concatedCounts = [].concat.apply([], productsCounts);

        const reducedByLoction = Array.from(
          concatedCounts.reduce(
            (m, { location, quantityAvailable }) =>
              m.set(location, (m.get(location) || 0) + quantityAvailable),
            new Map()
          ),
          ([location, quantityAvailable]) => ({ location, quantityAvailable })
        );

        const location = reducedByLoction.reduce((acc, curr) => {
          return acc.quantityAvailable > curr.quantityAvailable ? acc : curr;
        }).location;

        this.selectedLocation$.next({ location: location });
      }
    })
  );

  private selectedDataProducts$: Observable<Product[]> = combineLatest([
    this.selectedLocation$,
    this.product$
  ]).pipe(
    switchMap(
      ([selectedLocation, products]: [{ location: string }, Product[]]) => {
        const productsCounts = products.map((product) => [...product.counts]);
        const concatedCounts = [].concat.apply([], productsCounts);
        const filteredCounts = concatedCounts.filter(
          (el) => el.location === selectedLocation.location
        );
        const finalProducts :Product[] = filteredCounts.map((productCounts) => {
          return {
            name: products[0].name,
            description: products[0].description,
            picture: products[0].picture,
            counts: [productCounts]
          };
        });

        return of(finalProducts);
      }
    ),
  );

  readonly totalNumber$:Observable<number> = this.selectedDataProducts$.pipe(
    map(products=>products.length)
  )

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

  updateSelectedLocation(location: { location: string }) {
    this.selectedLocation$.next(location);
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

  onPageChange(pageIndex: number): void {
    this.store.dispatch(changePageAction({ pageIndex }));
  }
}
