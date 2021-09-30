import { ComponentHarness } from '@angular/cdk/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { MatSelectHarness } from '@angular/material/select/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatOptionHarness } from '@angular/material/core/testing';
import { MatAutocompleteHarness } from '@angular/material/autocomplete/testing';

export class SearchHarness extends ComponentHarness {
  static hostSelector = 'tk-search';
  getInput = this.locatorForOptional(MatInputHarness);
  getSelector = this.locatorForOptional(MatSelectHarness);
  getClearBtn = this.locatorForOptional(
    MatButtonHarness.with({ text: 'refresh' })
  );
  protected getLabel = this.locatorFor('mat-label');
  protected getAutocomplete = this.locatorForOptional(MatAutocompleteHarness);

  async labelText(): Promise<string> {
    const label = await this.getLabel();
    return label.text();
  }

  async setInputValue(value: string): Promise<void> {
    const input = await this.getInput();
    return input && input.setValue(value);
  }

  async setSelectorValue(option: string): Promise<void> {
    const selector = await this.getSelector();
    return selector && selector.clickOptions({ text: option });
  }

  async getInputValue(): Promise<string | null> {
    const input = await this.getInput();
    return input ? input.getValue() : null;
  }

  async getSelectorValue(): Promise<string> {
    const selector = await this.getSelector();
    return selector ? selector.getValueText() : null;
  }

  async getInputOptions(): Promise<MatOptionHarness[] | null> {
    const autocomplete = await this.getAutocomplete();
    const input = await this.getInput();
    if (input && autocomplete) {
      await input.focus();
      return autocomplete.getOptions();
    }
    return null;
  }

  async getSelectorOptions(): Promise<MatOptionHarness[] | null> {
    const selector = await this.getSelector();
    if (selector) {
      await selector.open();
      const selectorOptions = selector.getOptions();
      await selector.close();
      return selectorOptions;
    }
    return null;
  }

  async clearSearch(): Promise<void> {
    const clearBtn = await this.getClearBtn();
    return clearBtn && clearBtn.click();
  }
}
