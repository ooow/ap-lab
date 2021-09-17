import { ComponentHarness, TestElement } from '@angular/cdk/testing';

export class ProductHarness extends ComponentHarness {
  static hostSelector = 'tk-product';

  getTitle = this.locatorFor('mat-card-title');
  getImage = this.locatorFor('.card__image img');
  getDescription = this.locatorFor('mat-card-content p');

  async titleText(): Promise<string> {
    const title = await this.getTitle();
    return title.text();
  }

  async img(): Promise<TestElement> {
    return this.getImage();
  }

  async description(): Promise<string> {
    const img = await this.getDescription();
    return img.text();
  }
}
