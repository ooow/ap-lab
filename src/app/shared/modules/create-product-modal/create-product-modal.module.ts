import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductModalComponent } from './create-product-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { A11yModule } from '@angular/cdk/a11y';

@NgModule({
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    A11yModule
  ],
  declarations: [CreateProductModalComponent],
  exports: [CreateProductModalComponent]
})
export class CreateProductModalModule {}
