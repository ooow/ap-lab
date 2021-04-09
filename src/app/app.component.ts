import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ProductSelectors from './store/product/product.selectors';
import * as ProductActions from './store/product/product.actions';
import * as LangSelectors from './store/lang/lang.selectors';
import * as LangActions from './store/lang/lang.actions';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Lang } from './models/lang';

@Component({
  selector: 'tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  products$: Observable<Array<Product>>;
  search$: Observable<string>;
  searchOptions$: Observable<Array<string>>;
  lang$: Observable<Lang>;
  readonly loading$ = new BehaviorSubject<boolean>(true);
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly productService: ProductService
  ) {
    this.lang$ = this.store.select(LangSelectors.langSelector);
    this.products$ = this.store.select(ProductSelectors.products);
    this.search$ = this.store.select(ProductSelectors.search);
    this.searchOptions$ = this.products$.pipe(
      map((products) => products.map((cv) => cv.name))
    );
  }

  ngOnInit(): void {
    this.lang$
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((lang) => this.productService.getProducts(lang)),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((products) => {
        this.store.dispatch(ProductActions.retrieveProducts({ products }));
        this.loading$.next(false);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  onSearchChange(search: string): void {
    this.store.dispatch(ProductActions.search({ search }));
  }

  onLangChange(lang: Lang): void {
    this.store.dispatch(LangActions.change({ lang }));
  }
}
