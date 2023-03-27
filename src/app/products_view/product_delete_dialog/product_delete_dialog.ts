import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ProductDetailsDialogData} from '../product_details_dialog/product_details_dialog';

@Component({
  selector   : 'tk-product-delete-dialog',
  templateUrl: './product_delete_dialog.ng.html',
  styleUrls  : ['./product_delete_dialog.scss'],
})
export class ProductDeleteDialog {
  constructor(readonly dialogRef: MatDialogRef<ProductDeleteDialog>,
    @Inject(MAT_DIALOG_DATA) readonly data: ProductDetailsDialogData) {}
}
