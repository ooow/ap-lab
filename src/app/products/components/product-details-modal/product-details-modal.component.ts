import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'tk-product-details-modal',
  templateUrl: './product-details-modal.component.html',
  styleUrls: ['./product-details-modal.component.scss']
})
export class ProductDetailsModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { product: Product },
    public dialogRef: MatDialogRef<ProductDetailsModalComponent>
  ) {}
}
