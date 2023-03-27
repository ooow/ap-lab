import {AsyncFactoryFn, ComponentHarness} from '@angular/cdk/testing';
import {LoaderHarness} from 'src/app/shared/component/loader/loader.harness';

export class ProductsViewHarness extends ComponentHarness {
  static hostSelector = 'tk-products-view';

  async isLoading(): Promise<boolean> {
    const getSpinner: AsyncFactoryFn<LoaderHarness> = this.locatorForOptional(
      LoaderHarness);
    const loader = await getSpinner();
    return Boolean(loader);
  }
}
