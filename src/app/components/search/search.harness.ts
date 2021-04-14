import { ComponentHarness } from '@angular/cdk/testing';

export class SearchHarness extends ComponentHarness {
  static hostSelector = 'tk-search';

  getLabel = this.locatorFor('mat-label');

  async labelText(): Promise<string> {
    const label = await this.getLabel();
    return label.text();
  }
}
