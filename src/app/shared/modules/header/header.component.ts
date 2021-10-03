import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/products/models/product';
import * as ProductActions from 'src/app/products/store/product/product.actions';
import * as ProductSelectors from 'src/app/products/store/product/product.selectors';

import { Lang } from 'src/app/shared/models/lang';
import { CreateProductModalComponent } from 'src/app/shared/modules/create-product-modal/create-product-modal.component';
import * as LangActions from 'src/app/shared/store/lang/lang.actions';
import * as LangSelectors from 'src/app/shared/store/lang/lang.selectors';

@Component({
  selector: 'tk-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
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

  constructor(readonly store: Store, private dialog: MatDialog) {
    this.showCreateProductDialog();
  }

  showCreateProductDialog(): void {
    const dialogRef = this.dialog.open(CreateProductModalComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed');
      console.log('Value: ', result);
    });
  }
}
