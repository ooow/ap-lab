import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatIconHarness } from '@angular/material/icon/testing';
import { MatToolbarHarness } from '@angular/material/toolbar/testing';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';

export class ProductTableHarness extends ComponentHarness {
  static hostSelector = 'tk-product-table';

  getLoadingSpinner = this.locatorForOptional(MatProgressSpinnerHarness);

  getTooltips = this.locatorForAll(MatTooltipHarness);

  async isLoading(): Promise<boolean> {
    const spinner = await this.getLoadingSpinner();
    return Boolean(spinner);
  }

  async getTooltipText(id: number): Promise<string | null> {
    const tooltips = await this.getTooltips();
    const targetTooltip = tooltips[id];
    if (targetTooltip) {
      await targetTooltip.show();
      const tooltipText = targetTooltip.getTooltipText();
      await targetTooltip.hide();
      return tooltipText;
    }
    return null;
  }
}
