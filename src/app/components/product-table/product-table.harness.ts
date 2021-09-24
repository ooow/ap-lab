import { ComponentHarness } from '@angular/cdk/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';

export class ProductTableHarness extends ComponentHarness {
  static hostSelector = 'tk-product-table';

  getLoadingSpinner = this.locatorForOptional(MatProgressSpinnerHarness);
  getTooltips = this.locatorForAll(MatTooltipHarness);
  getPictureUrl = this.locatorFor('.picture-url-container p');
  getCopyPictureUrlBtn = this.locatorFor('.picture-url-container button');
  async;

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

  async pictureUrl(): Promise<string> {
    const picUrl = await this.getPictureUrl();
    return picUrl.text();
  }

  async clickCopyPicUrlBtn(): Promise<void> {
    const copyPictureUrlBtn = await this.getCopyPictureUrlBtn();
    await copyPictureUrlBtn.click();
  }
}