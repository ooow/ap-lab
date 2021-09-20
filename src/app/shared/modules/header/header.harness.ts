import { ComponentHarness } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';

export class HeaderHarness extends ComponentHarness {
  static hostSelector = 'tk-header';

  private getButtons = this.locatorForAll(MatButtonHarness);

  private async findNavButton(
    buttonName: string
  ): Promise<MatButtonHarness | undefined> {
    const navBtns = await this.getButtons();
    const navButtonNames = await this.findAllNavButtons();
    const targetNavBtnIndex = navButtonNames.findIndex(
      (navBtnName) => buttonName === navBtnName
    );
    return navBtns[targetNavBtnIndex];
  }

  async findAllNavButtons(): Promise<string[]> {
    const navBtns = await this.getButtons();
    const navButtonNames = navBtns.map((navBtn) => navBtn.getText());
    return Promise.all(navButtonNames);
  }

  async clickNavButton(buttonName: string): Promise<void> {
    const button = await this.findNavButton(buttonName);
    await button.click();
  }
}
