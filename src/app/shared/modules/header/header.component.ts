import { Component, OnDestroy, OnInit } from '@angular/core';
import { combineLatest, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';
import { filter, map, takeUntil } from 'rxjs/operators';

import { Lang } from 'src/app/shared/models/lang';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import { Product } from 'src/app/products/models/product';
import { NavigationEnd, Router, RouterEvent } from '@angular/router';
import { SearchTypes } from 'src/app/shared/modules/header/components/search/search.types';

@Component({
  selector: 'tk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products
  );
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.topProducts
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  searchType: SearchTypes = SearchTypes.INPUT;

  readonly searchOptions$: Observable<Array<string>> = combineLatest([
    this.products$,
    this.topProducts$
  ]).pipe(
    map(([products, topProducts]: [Product[], Product[]]) => {
      return Array.from(
        new Set([
          ...products.map((cv) => cv.name),
          ...topProducts.map((cv) => cv.name)
        ])
      );
    })
  );
  readonly LangActions = LangActions;
  readonly ProductActions = ProductActions;
  private readonly destroy$ = new Subject<void>();

  constructor(readonly store: Store, readonly router: Router) {}

  ngOnInit(): void {
    this.initializeSubscriptions();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  initializeSubscriptions(): void {
    this.router.events
      .pipe(
        filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: RouterEvent) => {
        this.searchType = this.getSearchType(event.url);
      });
  }

  getSearchType(path): SearchTypes {
    switch (path) {
      case '/dashboard':
        return SearchTypes.SELECTOR;
      case '/products':
        return SearchTypes.INPUT;
      default:
        return SearchTypes.INPUT;
    }
  }
}
