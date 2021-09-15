import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class ProductDetailsModalHarness extends ComponentHarness {
  static hostSelector = 'tk-product-details-modal';

  getTitle = this.locatorFor('[mat-dialog-title]');
  getCloseBtn = this.locatorFor(MatButtonHarness);
  getPicture = this.locatorFor('[mat-dialog-content] img');
  getDescription = this.locatorFor('[mat-dialog-content] p');

  async titleText(): Promise<string> {
    const title = await this.getTitle();
    return title.text();
  }

  async closeBtnClick(): Promise<void> {
    const close = await this.getCloseBtn();
    await close.click();
  }

  async picture(): Promise<TestElement> {
    return this.getPicture();
  }

  async description(): Promise<string> {
    const description = await this.getDescription();
    return description.text();
  }
}
