import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { CreateProductModalHarness } from 'src/app/shared/modules/create-product-modal/create-product-modal.harness';

export class HeaderHarness extends ComponentHarness {
  static hostSelector = 'tk-header';
  private rootLocatorFactory = this.documentRootLocatorFactory();

  private getNavButtons = this.locatorForAll(
    MatButtonHarness.with({ selector: 'a' })
  );
  private getCreateProductBtn = this.locatorFor(
    MatButtonHarness.with({ selector: '.stored-product-btn' })
  );
  private getCreateProductModal = this.rootLocatorFactory.locatorFor(
    CreateProductModalHarness
  );

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

  async createProductModal(): Promise<CreateProductModalHarness> {
    return this.getCreateProductModal();
  }

  private async findNavButton(
    buttonName: string
  ): Promise<MatButtonHarness | undefined> {
    const navBtns = await this.getNavButtons();
    const navButtonNames = await this.findAllNavButtons();
    const targetNavBtnIndex = navButtonNames.findIndex(
      (navBtnName) => buttonName === navBtnName
    );
    return navBtns[targetNavBtnIndex];
  }
}
