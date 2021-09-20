import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Lang } from 'src/app/shared/models/lang';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import { Product } from 'src/app/products/models/product';

@Component({
  selector: 'tk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  readonly lang$: Observable<Lang> = this.store.select(
    LangSelectors.langSelector
  );
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products
  );
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.topProducts
  );
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

  private routesToShowSearchList = ['/dashboard', '/products'];

  constructor(readonly store: Store, readonly router: Router) {}

  isProductSearchVisible(): boolean {
    return this.routesToShowSearchList.some((route) =>
      this.router.isActive(route, false)
    );
  }

  ngOnInit(): void {}
}
