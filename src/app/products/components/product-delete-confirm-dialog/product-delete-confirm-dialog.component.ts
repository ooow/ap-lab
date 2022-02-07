import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Product } from 'src/app/shared/models/product';

@Component({
  selector: 'tk-product-delete-confirm-dialog',
  templateUrl: './product-delete-confirm-dialog.component.html',
  styleUrls: ['./product-delete-confirm-dialog.component.scss']
})
export class ProductDeleteConfirmDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ProductDeleteConfirmDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public product: Product
  ) {}

  ngOnInit(): void {
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
