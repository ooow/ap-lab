import {ComponentHarness} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';
import {CreateProductDialogHarness} from 'src/app/products_view/create_product_dialog/testing/create_product_dialog_harness';
import {SearchHarness} from 'src/app/shared/component/header/search/search.harness';

export class HeaderHarness extends ComponentHarness {
  static hostSelector = 'tk-header';
  private rootLocatorFactory = this.documentRootLocatorFactory();

  private getNavButtons = this.locatorForAll(
    MatButtonHarness.with({selector: 'a'}));
  private getProductSearch = this.locatorFor(SearchHarness);
  getCreateProductBtn = this.locatorForOptional(
    MatButtonHarness.with({selector: '.create-product-btn'}));
  private getCreateProductModal = this.rootLocatorFactory.locatorFor(
    CreateProductDialogHarness);

  async findAllNavButtons(): Promise<string[]> {
    const navBtns = await this.getNavButtons();
    const navButtonNames = navBtns.map((navBtn) => navBtn.getText());
    return Promise.all(navButtonNames);
  }

  async clickNavButton(buttonName: string): Promise<void> {
    const button = await this.findNavButton(buttonName);
    await button.click();
  }

  async clickCreateProductBtn(): Promise<void> {
    const createProductBtn = await this.getCreateProductBtn();
    await createProductBtn.click();
  }

  async createProductModal(): Promise<CreateProductDialogHarness> {
    return this.getCreateProductModal();
  }

  async findNavButton(buttonName: string): Promise<MatButtonHarness> {
    const getNavBtn = this.locatorFor(
      MatButtonHarness.with({text: buttonName}));
    return getNavBtn();
  }

  async productSearch(): Promise<SearchHarness> {
    return await this.getProductSearch();
  }
}
