import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatProgressSpinnerHarness } from '@angular/material/progress-spinner/testing';
import { MatTooltipHarness } from '@angular/material/tooltip/testing';

export class ProductTableHarness extends ComponentHarness {
  static hostSelector = 'tk-product-table';

  getLoadingSpinner = this.locatorForOptional(MatProgressSpinnerHarness);
  getDescriptionTooltips = this.locatorForAll(
    MatTooltipHarness.with({ ancestor: '.description' })
  );
  getPictureUrl = this.locatorFor('.picture-url-container p');
  getCopyPictureUrlBtn = this.locatorFor('.picture-url-container button');
  getAllDeleteProductBtns = this.locatorForAll(
    MatButtonHarness.with({ selector: '[aria-label="Delete Product"]' })
  );
  getAllDetailsLinks = this.locatorForAll(
    MatButtonHarness.with({ selector: '[aria-label="Product details"]' })
  );

  async isLoading(): Promise<boolean> {
    const spinner = await this.getLoadingSpinner();
    return Boolean(spinner);
  }

  async getDescriptionTooltipText(id: number): Promise<string | null> {
    const tooltips = await this.getDescriptionTooltips();
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
    return copyPictureUrlBtn.click();
  }

  async deleteProductBtns(
    id?: number
  ): Promise<MatButtonHarness | MatButtonHarness[] | null> {
    const buttons = await this.getAllDeleteProductBtns();
    if ((id === 0 || id) && buttons[id]) {
      return buttons[id];
    }
    if (!id && buttons.length) {
      return buttons;
    }
    return null;
  }

  async productDetailsLinks(
    id?: number
  ): Promise<MatButtonHarness | MatButtonHarness[] | null> {
    const links = await this.getAllDetailsLinks();
    return links[id] ?? links ?? null;
  }
}
