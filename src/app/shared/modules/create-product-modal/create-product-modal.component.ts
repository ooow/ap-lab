import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { delay, map, takeUntil } from 'rxjs/operators';

import { ImageUrlValidator } from 'src/app/shared/modules/create-product-modal/validators/image-url.validator';
import { CreateProductFormType } from 'src/app/shared/types/create-product-form.type';

@Component({
  selector: 'tk-create-product-modal',
  templateUrl: './create-product-modal.component.html',
  styleUrls: ['./create-product-modal.component.scss']
})
export class CreateProductModalComponent implements OnInit, OnDestroy {
  form: FormGroup;
  formValues: CreateProductFormType;
  private destroy$ = new Subject<void>();

  constructor(
    private dialogRef: MatDialogRef<CreateProductModalComponent>,
    private fb: FormBuilder,
    private imageUrlValidator: ImageUrlValidator
  ) {}

  static removeWhiteSpaces(value: string): string {
    return value.trim().replace(/(\r\n|\n|\r|\s\s+)/gm, ' ');
  }

  ngOnInit(): void {
    this.initializeForm();
    this.cleanFormValues();
    this.bindDialogEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  closeDialog(): void {
    if (this.form.pristine) {
      this.dialogRef.close();
    } else if (
      confirm(
        'You have unsaved changes! Are you sure you want to close the dialog?'
      )
    ) {
      this.dialogRef.close();
    }
  }

  bindDialogEvents(): void {
    this.dialogRef
      .keydownEvents()
      .subscribe(({ key }) => key === 'Escape' && this.closeDialog());

    this.dialogRef.backdropClick().subscribe(() => this.closeDialog());
  }

  getErrorMessage(inputName: string): string {
    if (this.form.hasError('required', inputName)) {
      return 'You must enter a value';
    }
    switch (inputName) {
      case 'name':
        if (this.form.hasError('maxlength', inputName)) {
          return 'Name should be at most 30 characters long';
        }
        if (this.form.hasError('pattern', inputName)) {
          return 'Enter valid name';
        }
        break;
      case 'picture':
        if (this.form.hasError('url', inputName)) {
          return 'Provide valid image url';
        }
        break;
      case 'description':
        if (this.form.hasError('minlength', inputName)) {
          return 'Description should be at least 10 characters long';
        }
        if (this.form.hasError('maxlength', inputName)) {
          return 'Description should be at most 500 characters long';
        }
        if (this.form.hasError('pattern', inputName)) {
          return 'Enter valid description';
        }
        break;
      default:
        break;
    }
  }

  private cleanFormValues(): void {
    this.form.valueChanges
      .pipe(
        map((control) => ({
          name: CreateProductModalComponent.removeWhiteSpaces(control.name),
          description: CreateProductModalComponent.removeWhiteSpaces(
            control.description
          )
        })),
        takeUntil(this.destroy$)
      )
      .subscribe((sanitizedValues) => {
        this.formValues = {
          ...this.formValues,
          ...sanitizedValues
        };
      });

    this.form.statusChanges
      .pipe(
        delay(500),
        map(() => ({
          picture: !this.form.get('picture').errors
            ? this.form.value.picture
            : ''
        })),
        takeUntil(this.destroy$)
      )
      .subscribe((checkedPicUrl) => {
        this.formValues = {
          ...this.formValues,
          ...checkedPicUrl
        };
      });
  }

  private initializeForm(): void {
    const textRegEx = /^[\w\n\sЁёА-я.…,:;!?()"'\/&+-]*$/;

    this.form = this.fb.group(
      {
        name: [
          '',
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern(textRegEx)
          ]
        ],
        picture: [
          '',
          [Validators.required],
          [this.imageUrlValidator.validate.bind(this.imageUrlValidator)]
        ],
        description: [
          '',
          [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(500),
            Validators.pattern(textRegEx)
          ]
        ]
      },
      { updateOn: 'blur' }
    );
  }
}
