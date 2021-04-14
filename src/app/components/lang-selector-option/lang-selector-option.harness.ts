import { ComponentHarness } from '@angular/cdk/testing';

export class LangSelectorOptionHarness extends ComponentHarness {
  static hostSelector = 'tk-lang-selector-option';

  getLangOption = this.locatorForOptional('span');

  async text(): Promise<string | null> {
    const langOption = await this.getLangOption();
    return langOption?.text();
  }
}
