import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDeleteConfirmation } from 'src/app/shared/models/product-delete-confirmation';
@Component({
  selector: 'tk-product-delete-confirm-dialog',
  templateUrl: './product-delete-confirm-dialog.component.html',
  styleUrls: ['./product-delete-confirm-dialog.component.scss']
})
export class ProductDeleteConfirmDialogComponent {
  constructor(
    readonly dialogRef: MatDialogRef<ProductDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: ProductDeleteConfirmation
  ) {}
}
