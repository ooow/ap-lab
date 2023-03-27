import {ComponentHarness} from '@angular/cdk/testing';
import {MatButtonHarness} from '@angular/material/button/testing';

export class ProductDeleteDialogHarness extends ComponentHarness {
  static hostSelector = 'tk-product-delete-dialog';

  getTitle = this.locatorFor('[mat-dialog-title]');
  getBody = this.locatorFor('[mat-dialog-content] p');
  getCancelButton = this.locatorFor(MatButtonHarness.with({text: 'Cancel'}));
  getDeleteButton = this.locatorFor(MatButtonHarness.with({text: 'Delete'}));
}
