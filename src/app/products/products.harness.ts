import { AsyncFactoryFn, ComponentHarness } from '@angular/cdk/testing';
import { LoaderHarness } from 'src/app/shared/modules/loader/loader.harness';

export class ProductsHarness extends ComponentHarness {
  static hostSelector = 'tk-products';

  async isLoading(): Promise<boolean> {
    const getSpinner: AsyncFactoryFn<LoaderHarness> = this.locatorForOptional(
      LoaderHarness
    );
    const loader = await getSpinner();
    return Boolean(loader);
  }
}
