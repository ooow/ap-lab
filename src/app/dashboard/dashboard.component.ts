import { Component, OnDestroy, OnInit } from '@angular/core';
import { finalize, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Lang } from 'src/app/shared/models/lang';
import { ProductsResp } from 'src/app/products/models/products-resp';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Store } from '@ngrx/store';

import { ProductService } from 'src/app/products/services/product.service';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import { Product } from 'src/app/products/models/product';

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
  readonly products$: Observable<Product[]> = this.store.select(
    ProductSelectors.products
  );

  readonly loading$ = new BehaviorSubject<boolean>(true);
  private readonly destroy$ = new Subject<void>();

  readonly chartConfigs = {
    title: 'Product Availability By Location',
    width: 800,
    height: 600
  };

  constructor(private store: Store, private productService: ProductService) {
    this.lang$
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((lang: Lang) => productService.getProducts(lang, 0, -1)),
        finalize(() => this.loading$.next(false)),
        takeUntil(this.destroy$)
      )
      .subscribe((resp: ProductsResp) => {
        this.store.dispatch(ProductActions.retrieveProducts(resp));

        this.loading$.next(false);
      });
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
