import {ComponentHarness} from '@angular/cdk/testing';
import {MatProgressSpinnerHarness} from '@angular/material/progress-spinner/testing';

export class LoaderHarness extends ComponentHarness {
  static hostSelector = 'tk-loader';

  async getLoader(): Promise<MatProgressSpinnerHarness> {
    const getSpinner = this.locatorFor(MatProgressSpinnerHarness);
    return await getSpinner();
  }
}
