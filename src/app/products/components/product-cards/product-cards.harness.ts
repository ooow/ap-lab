import { ComponentHarness } from "@angular/cdk/testing";
import { MatProgressSpinnerHarness } from "@angular/material/progress-spinner/testing";
import { ProductHarness } from "../product/product.harness";

export class ProductCardsHarness extends ComponentHarness {
    static hostSelector = 'tk-product-cards';

    getLoadingSpinner = this.locatorForOptional(MatProgressSpinnerHarness);
    getAllCards = this.locatorForAll(ProductHarness);

    async isLoading(): Promise<boolean> {
        const spinner = await this.getLoadingSpinner();
        return Boolean(spinner);
    }

    async productCards(): Promise<ProductHarness[]> {
        const cards = await this.getAllCards();
        return cards
    }
}