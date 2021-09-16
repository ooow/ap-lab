import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';

export class ProductTableHarness extends ComponentHarness {
  static hostSelector = 'tk-product-table';

  getLoadingSpinner = this.locatorForOptional(MatProgressSpinnerHarness);

  async isLoading(): Promise<boolean> {
    const spinner = await this.getLoadingSpinner();
    return Boolean(spinner);
  }
}
