import { ComponentHarness } from '@angular/cdk/testing';

export class ProductAvailabilityDetailsHarness extends ComponentHarness {
  static hostSelector = 'tk-product-availability-details';

  // getQuantityAvailable = this.locatorFor('#quantity-avl');
  // getPrice = this.locatorFor('#price');

  async getQuantityAvailableValue(): Promise<number> {
    // const element = await this.getQuantityAvailable();
    // return Number(element.text());
    return new Promise(() => 100);
  }

  async getPriceValue(): Promise<number> {
    // const element = await this.getPrice();
    // return Number(element.text());
    return new Promise(() => 100);
  }
}
