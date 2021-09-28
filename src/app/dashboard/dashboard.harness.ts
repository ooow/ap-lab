import {
  AsyncFactoryFn,
  ComponentHarness,
  TestElement
} from '@angular/cdk/testing';
import { LoaderHarness } from 'src/app/shared/modules/loader/loader.harness';
import { ChartHarness } from 'src/app/dashboard/components/chart/chart.harness';

export class DashboardHarness extends ComponentHarness {
  static hostSelector = 'tk-dashboard';

  protected getPageTitle = this.locatorFor('h1');
  protected getText = this.locatorForOptional('h3');
  protected getCharts = this.locatorForAll(ChartHarness);

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

  async charts(): Promise<TestElement[]> {
    const chartHarnesses = await this.getCharts();
    const chartTestElements = chartHarnesses.map((harness) => harness.host());
    return Promise.all(chartTestElements);
  }
}
