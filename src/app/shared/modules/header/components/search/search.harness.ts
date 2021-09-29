import { ComponentHarness } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

export class SearchHarness extends ComponentHarness {
  static hostSelector = 'tk-search';
  protected getLabel = this.locatorFor('mat-label');
  protected getInput = this.locatorForOptional(MatInputHarness);
  protected getSelector = this.locatorForOptional(MatSelectHarness);
  protected getClearBtn = this.locatorForOptional(
    MatButtonHarness.with({ text: 'refresh' })
  );
  protected getAutocomplete = this.locatorForOptional(MatAutocompleteHarness);

  async labelText(): Promise<string> {
    const label = await this.getLabel();
    return label.text();
  }

  async isInput(): Promise<boolean> {
    const input = await this.getInput();
    return Boolean(input);
  }

  async isSelector(): Promise<boolean> {
    const selector = await this.getSelector();
    return Boolean(selector);
  }

  async clearBtn(): Promise<MatButtonHarness | null> {
    return await this.getClearBtn();
  }

  async setInputValue(value: string): Promise<void> {
    const input = await this.getInput();
    return input.setValue(value);
  }

  async setSelectorValue(option: string): Promise<void> {
    const selector = await this.getSelector();
    return selector.clickOptions({ text: option });
  }

  async getInputValue(): Promise<string> {
    const input = await this.getInput();
    return input.getValue();
  }

  async getSelectorValue(): Promise<string> {
    const selector = await this.getSelector();
    return selector.getValueText();
  }

  async getInputOptions(): Promise<MatOptionHarness[]> {
    const autocomplete = await this.getAutocomplete();
    const input = await this.getInput();
    await input.focus();
    return autocomplete.getOptions();
  }

  async getSelectorOptions(): Promise<MatOptionHarness[]> {
    const selector = await this.getSelector();
    await selector.open();
    return selector.getOptions();
  }
}
