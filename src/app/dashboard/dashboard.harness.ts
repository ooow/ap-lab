import { AsyncFactoryFn, ComponentHarness } from '@angular/cdk/testing';
import { LoaderHarness } from 'src/app/shared/modules/loader/loader.harness';
import { DashboardComponent } from 'src/app/dashboard/dashboard.component';

export class DashboardHarness extends ComponentHarness {
  static hostSelector = 'tk-dashboard';

  getPageTitle = this.locatorFor('[data-testid="dashboard-title"]');
  getText = this.locatorForOptional('[data-testid="dashboard-text"]');

  async pageTitle(): Promise<string> {
    const title = await this.getPageTitle();
    return title.text();
  }

  async pageText(): Promise<string | null> {
    const text = await this.getText();
    return text ? text.text() : null;
  }

  async isLoading(): Promise<boolean> {
    const getSpinner: AsyncFactoryFn<LoaderHarness> = this.locatorForOptional(
      LoaderHarness
    );
    const loader = await getSpinner();
    return Boolean(loader);
  }
}
