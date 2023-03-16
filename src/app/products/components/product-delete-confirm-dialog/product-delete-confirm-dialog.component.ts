import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductDialogInfo } from 'src/app/shared/models/product-dialog-info';

@Component({
  selector: 'tk-product-delete-confirm-dialog',
  templateUrl: './product-delete-confirm-dialog.component.html',
  styleUrls: ['./product-delete-confirm-dialog.component.scss']
})
export class ProductDeleteConfirmDialogComponent {
  constructor(
    readonly dialogRef: MatDialogRef<ProductDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) readonly data: ProductDialogInfo
  ) {}
}
