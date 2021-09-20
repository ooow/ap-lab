import { AsyncFactoryFn, ComponentHarness } from '@angular/cdk/testing';
import { LoaderHarness } from 'src/app/shared/components/loader/loader.harness';
import { ProductsComponent } from 'src/app/products/products.component';

export class ProductsHarness extends ComponentHarness {
  static hostSelector = 'tk-products';

  async isLoading(): Promise<boolean> {
    const getSpinner: AsyncFactoryFn<LoaderHarness> = this.locatorForOptional(
      LoaderHarness
    );
    const loader = await getSpinner();
    return Boolean(loader);
  }

  setLoading(component: ProductsComponent, value: boolean): void {
    component.globalLoading$.next(value);
  }
}
