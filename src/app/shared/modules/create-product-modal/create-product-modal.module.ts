import { A11yModule } from '@angular/cdk/a11y';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { ImageUrlValidator } from 'src/app/shared/modules/create-product-modal/validators/image-url.validator';
import { CreateProductModalComponent } from './create-product-modal.component';

@NgModule({
  imports: [
    A11yModule,
    CommonModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule
  ],
  declarations: [CreateProductModalComponent],
  exports: [CreateProductModalComponent],
  providers: [ImageUrlValidator]
})
export class CreateProductModalModule {}
