import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Product} from '../../shared/model/product';
import {Subject} from 'rxjs';

export interface ProductDetailsDialogData {
  product: Product;
  initiateClose?: Subject<boolean>;
  deleteProduct?: Subject<boolean>;
}

@Component({
  selector   : 'tk-product-details-dialog',
  templateUrl: './product_details_dialog.ng.html',
  styleUrls  : ['./product_details_dialog.scss'],
})
export class ProductDetailsDialog {
  constructor(@Inject(MAT_DIALOG_DATA) public data: ProductDetailsDialogData,
    public dialogRef: MatDialogRef<ProductDetailsDialog>) {}
}
