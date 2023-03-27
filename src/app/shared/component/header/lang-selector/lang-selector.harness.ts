import {ComponentHarness} from '@angular/cdk/testing';

export class LangSelectorHarness extends ComponentHarness {
  static hostSelector = 'tk-lang-selector';

  getLabel = this.locatorFor('mat-label');

  async labelText(): Promise<string> {
    const label = await this.getLabel();
    return label.text();
  }
}
