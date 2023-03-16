import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductDialogInfo } from 'src/app/shared/models/product-dialog-info';

@Component({
  selector: 'tk-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss']
})
export class ProductDetailsModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: ProductDialogInfo,
    public dialogRef: MatDialogRef<ProductDetailsModalComponent>
  ) {}
}
