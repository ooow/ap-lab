import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {select, Store} from '@ngrx/store';
import {combineLatest, Observable, Subject} from 'rxjs';
import {filter, map, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import {NavigationEnd, Router, RouterEvent} from '@angular/router';

import {Language} from 'src/app/shared/component/header/lang-selector/lang-selector.component';
import {Product} from 'src/app/shared/model/product';
import {CreateProductDialog, CreateProductForm} from 'src/app/products_view/create_product_dialog/create_product_dialog';
import {SearchTypes} from 'src/app/shared/component/header/search/search.component';
import * as LangActions from 'src/app/store/lang/lang.actions';
import * as LangSelectors from 'src/app/store/lang/lang.selectors';
import {searchProductAction} from 'src/app/store/product/actions/search-product.action';
import * as ProductSelectors from 'src/app/store/product/product.selectors';
import {createProductAction} from 'src/app/store/stored-product/actions/create-product.actions';
import * as CreateProductSelectors from 'src/app/store/stored-product/stored-product.selectors';
import * as TopProductsSelector from 'src/app/store/top-products/top-products.selectors';

@Component({
  selector   : 'tk-header',
  templateUrl: './header.component.html',
  styleUrls  : ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  readonly lang$: Observable<Language> = this.store.select(
    LangSelectors.langSelector);
  readonly products$: Observable<Array<Product>> = this.store.select(
    ProductSelectors.products);
  readonly topProducts$: Observable<Array<Product>> = this.store.select(
    TopProductsSelector.topProducts);
  readonly search$: Observable<string> = this.store.select(
    ProductSelectors.search);
  searchType: SearchTypes = SearchTypes.INPUT;
  displayCreateButton: boolean = true;

  readonly searchOptions$: Observable<Array<string>> = combineLatest([
    this.products$, this.topProducts$,
  ]).pipe(map(([products, topProducts]: [Product[], Product[]]) => {
    return Array.from(new Set([
      ...products
        .filter(
          (product) => this.searchType === SearchTypes.INPUT || product.counts)
        .map((cv) => cv.name), ...topProducts
        .filter(
          (product) => this.searchType === SearchTypes.INPUT || product.counts)
        .map((cv) => cv.name),
    ]));
  }));
  private readonly destroy$ = new Subject<void>();

  constructor(readonly store: Store, readonly router: Router,
    private dialog: MatDialog, private snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.router.events
      .pipe(filter((event: RouterEvent) => event instanceof NavigationEnd),
        takeUntil(this.destroy$))
      .subscribe((event: RouterEvent) => {
        this.displayCreateButton =
          event.url === '/products' || event.url === '/';
        this.searchType = this.getSearchType(event.url);
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
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

  onSearchChange(search: string): void {
    this.store.dispatch(searchProductAction({search}));
  }

  onLangChange(lang: Language): void {
    this.store.dispatch(LangActions.change({lang}));
  }

  createProductDialog(): void {
    const createProductDialogRef: MatDialogRef<CreateProductDialog, CreateProductForm | null> = this.dialog.open(
      CreateProductDialog, {
        width: '500px', disableClose: true,
      });

    const formValues$ = createProductDialogRef.afterClosed();

    combineLatest([formValues$, this.lang$])
      .pipe(take(1), filter(([formValues]) => Boolean(formValues)), tap(
          ([formValues, lang]) => this.store.dispatch(
            createProductAction({productData: formValues, lang}))),
        switchMap(() => combineLatest([
          this.store.pipe(select(CreateProductSelectors.isLoading)),
          this.store.pipe(select(CreateProductSelectors.message)),
        ]).pipe(take(3))))
      .subscribe(([isLoading, message]) => {
        if (isLoading) {
          this.openSnackBar(message);
        } else if (!isLoading) {
          this.openSnackBar(message, 5000);
        }
      });
  }

  openSnackBar(message: string, duration?: number): void {
    this.snackBar.open(message, 'Close', {
      duration, horizontalPosition: 'right',
    });
  }
}
