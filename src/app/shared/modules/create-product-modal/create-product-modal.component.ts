import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'tk-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit {
  form: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<CreateProductModalComponent>,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm(): void {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(30)]],
      pictureUrl: ['', Validators.required],
      description: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(500)
        ]
      ]
    });
  }

  getErrorMessage(inputName: string): string {
    if (this.form.hasError('required', inputName)) {
      return 'You must enter a value';
    }

    switch (inputName) {
      case 'name':
        if (this.form.hasError('maxlength', inputName)) {
          return 'name should be at most 30 characters long';
        }
        break;
      case 'description':
        if (this.form.hasError('minlength', inputName)) {
          return 'description should be at least 10 characters long';
        }
        if (this.form.hasError('maxlength', inputName)) {
          return 'description should be at most 500 characters long';
        }
        break;
      default:
        break;
    }
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
