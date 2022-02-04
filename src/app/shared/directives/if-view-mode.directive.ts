import { Directive, Input, OnDestroy, TemplateRef, ViewContainerRef } from '@angular/core';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ProductsView } from 'src/app/shared/models/products-view';
import * as ProductsViewSelectors from 'src/app/shared/store/products-view/products-view.selectors';

@Directive({
  selector: '[tkIfViewMode]'
})
export class IfViewModeDirective implements OnDestroy {

  private hasView = false;
  private readonly destroy$ = new Subject();

  constructor(
    private store: Store,
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
  ) { }

  @Input() set tkIfViewMode(mode: ProductsView) {
    this.store.select(ProductsViewSelectors.productsViewSelector)
    .pipe(
      takeUntil(this.destroy$)
    )
    .subscribe(viewMode => {
      if (mode === viewMode && !this.hasView) {
        console.log("false")
        this.viewContainer.createEmbeddedView(this.templateRef);
        this.hasView = true;
      } else if (mode !== viewMode && this.hasView) {
        this.viewContainer.clear();
        this.hasView = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }
}
