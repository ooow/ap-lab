import { Component, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { Lang } from './models/lang';
import { Product } from './models/product';
import { ProductService } from './services/product.service';
import * as LangActions from './store/lang/lang.actions';
import * as LangSelectors from './store/lang/lang.selectors';
import * as ProductActions from './store/product/product.actions';
import * as ProductSelectors from './store/product/product.selectors';

@Component({
  selector: 'tk-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products
  );
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search
  );
  readonly searchOptions$: Observable<Array<string>> = this.products$.pipe(
    map((products) => products.map((cv) => cv.name))
  );
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly loading$ = new BehaviorSubject<boolean>(true);
  readonly ProductActions = ProductActions;
  readonly LangActions = LangActions;
  private readonly destroy$ = new Subject<void>();

  constructor(readonly store: Store, productService: ProductService) {
    this.lang$
      .pipe(
        tap(() => this.loading$.next(true)),
        switchMap((lang) => productService.getProducts(lang)),
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
}
