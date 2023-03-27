import {Component, HostListener, OnDestroy, SecurityContext} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {Subject} from 'rxjs';
import {filter, map, takeUntil} from 'rxjs/operators';
import {imageUrlValidator} from 'src/app/products_view/create_product_dialog/image_url_validator/image_url_validator';

const TEXT_REGEX_PATTERN = /^[\w\n\sЁёА-я.…,:;!?()"'\/&+-]*$/;

export type CreateProductForm = {
  name: string; picture: string; description: string;
};

@Component({
  selector   : 'tk-create-product-modal',
  templateUrl: './create_product_dialog.ng.html',
  styleUrls  : ['./create_product_dialog.scss'],
})
export class CreateProductDialog implements OnDestroy {
  @HostListener('window:beforeunload',
    ['$event']) onWindowClose(event: Event): boolean {
    if (this.form.dirty) {
      event.preventDefault();
      return false;
    }
  }

  readonly form: FormGroup = this.fb.group({
    name      : [
      '', [
        Validators.required,
        Validators.maxLength(30),
        Validators.pattern(TEXT_REGEX_PATTERN),
      ],
    ], picture: ['', [Validators.required], [imageUrlValidator]], description: [
      '', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(500),
        Validators.pattern(TEXT_REGEX_PATTERN),
      ],
    ],
  }, {updateOn: 'blur'});

  formValues: CreateProductForm;
  private destroy$ = new Subject<void>();

  constructor(private dialogRef: MatDialogRef<CreateProductDialog>,
    private fb: FormBuilder, private sanitizer: DomSanitizer) {
    this.cleanFormValues();
    this.bindDialogEvents();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
  }

  bindDialogEvents(): void {
    this.dialogRef
      .keydownEvents()
      .pipe(takeUntil(this.destroy$))
      .subscribe(({key}) => key === 'Escape' && this.closeDialog());

    this.dialogRef
      .backdropClick()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.closeDialog());
  }

  closeDialog(): void {
    if (this.form.pristine) {
      this.dialogRef.close();
    } else if (confirm(
      'You have unsaved changes! Are you sure you want to close the dialog?')) {
      this.dialogRef.close();
    }
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

  isButtonDisabled(): boolean {
    return (this.form.invalid || !this.formValues ||
            Object.values(this.formValues).filter(Boolean).length !==
            Object.values(this.form.value).length);
  }

  sanitizeText(value: string): string {
    const trimmedVal = value.trim().replace(/(\r\n|\n|\r|\s\s+)/gm, ' ');
    return this.sanitizer.sanitize(SecurityContext.HTML, trimmedVal);
  }

  private cleanFormValues(): void {
    this.form.valueChanges
      .pipe(map((control) => ({
        name       : this.sanitizeText(control.name),
        description: this.sanitizeText(control.description),
      })), takeUntil(this.destroy$))
      .subscribe((sanitizedValues) => {
        this.formValues = {
          ...this.formValues, ...sanitizedValues,
        };
      });

    this.form.statusChanges
      .pipe(filter((status) => status !== 'PENDING'), map(() => ({
        picture: !this.form.get('picture').errors ?
                 this.sanitizer.sanitize(SecurityContext.URL,
                   this.form.value.picture) : '',
      })), takeUntil(this.destroy$))
      .subscribe((checkedPicUrl) => {
        this.formValues = {
          ...this.formValues, ...checkedPicUrl,
        };
      });
  }
}
