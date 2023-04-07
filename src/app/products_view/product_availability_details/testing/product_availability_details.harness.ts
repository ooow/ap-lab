import { ComponentHarness } from '@angular/cdk/testing';

export class ProductAvailabilityDetailsHarness extends ComponentHarness {
  static hostSelector = 'tk-product-availability-details';

  getQuantityAvailable = this.locatorForOptional('.details .quantity-avl');
  getPrice = this.locatorForOptional('.details .price');

  async getQuantityAvailableValue(): Promise<string> {
    const element = await this.getQuantityAvailable();
    return element?.getProperty('innerText');
  }

  async getPriceValue(): Promise<string> {
    const element = await this.getPrice();
    return element?.getProperty('innerText');
  }
}
