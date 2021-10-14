import { ComponentHarness, TestElement } from '@angular/cdk/testing';
import { MatButtonHarness } from '@angular/material/button/testing';
import { MatFormFieldHarness } from '@angular/material/form-field/testing';
import { MatInputHarness } from '@angular/material/input/testing';
import { CreateProductFormType } from 'src/app/shared/types/create-product-form.type';

export class CreateProductModalHarness extends ComponentHarness {
  static hostSelector = 'tk-stored-product-modal';

  getTitle = this.locatorFor('[mat-dialog-title]');
  getCancelBtn = this.locatorFor(MatButtonHarness.with({ text: 'Cancel' }));
  getCreateBtn = this.locatorFor(MatButtonHarness.with({ text: 'Create' }));
  getNameFormField = this.locatorFor(
    MatFormFieldHarness.with({ floatingLabelText: 'Name' })
  );
  getNameInput = this.locatorFor(
    MatInputHarness.with({ selector: '[formcontrolname="name"]' })
  );
  getPictureUrlFormField = this.locatorFor(
    MatFormFieldHarness.with({ floatingLabelText: 'Picture Url' })
  );
  getPictureUrlInput = this.locatorFor(
    MatInputHarness.with({ selector: '[formcontrolname="picture"]' })
  );
  getDescriptionFormField = this.locatorFor(
    MatFormFieldHarness.with({ floatingLabelText: 'Description' })
  );
  getDescriptionInput = this.locatorFor(
    MatInputHarness.with({ selector: '[formcontrolname="description"]' })
  );
  getPicture = this.locatorFor('.product-image');

  async titleText(): Promise<string> {
    const title = await this.getTitle();
    return title.text();
  }

  async cancelBtnClick(): Promise<void> {
    const cancel = await this.getCancelBtn();
    await cancel.click();
  }

  async createBtnClick(): Promise<void> {
    const create = await this.getCreateBtn();
    await create.click();
  }

  async nameFormField(): Promise<MatFormFieldHarness> {
    return this.getNameFormField();
  }

  async nameInput(): Promise<MatInputHarness> {
    return this.getNameInput();
  }

  async pictureUrlFormField(): Promise<MatFormFieldHarness> {
    return this.getPictureUrlFormField();
  }

  async pictureUrlInput(): Promise<MatInputHarness> {
    return this.getPictureUrlInput();
  }

  async descriptionFormField(): Promise<MatFormFieldHarness> {
    return this.getDescriptionFormField();
  }

  async descriptionInput(): Promise<MatInputHarness> {
    return this.getDescriptionInput();
  }

  async setFormValues(values: CreateProductFormType): Promise<void> {
    const nameInput = await this.nameInput();
    const pictureUrlInput = await this.pictureUrlInput();
    const descriptionInput = await this.descriptionInput();

    await nameInput.setValue(values.name);
    await pictureUrlInput.setValue(values.picture);
    await descriptionInput.setValue(values.description);
    await descriptionInput.blur();
  }

  async picture(): Promise<TestElement> {
    return this.getPicture();
  }
}
