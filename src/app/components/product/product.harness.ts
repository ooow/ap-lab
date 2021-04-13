import { ComponentHarness } from '@angular/cdk/testing';

export class ProductHarness extends ComponentHarness {
  static hostSelector = 'tk-product';

  getTitle = this.locatorFor('mat-card-title');
  getImage = this.locatorFor('[mat-card-image]');
  getDescription = this.locatorFor('mat-card-content p');

  async titleText(): Promise<string> {
    const title = await this.getTitle();
    return title.text();
  }

  async imgSrc(): Promise<string> {
    const img = await this.getImage();
    return img.getAttribute('src');
  }

  async imgAlt(): Promise<string> {
    const img = await this.getImage();
    return img.getAttribute('alt');
  }

  async description(): Promise<string> {
    const img = await this.getDescription();
    return img.text();
  }
}
