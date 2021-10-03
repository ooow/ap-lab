import { Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  Validators
} from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ImageUrlValidator implements AsyncValidator {
  private validationError = { url: true };

  static isPresent(obj: any): boolean {
    return obj !== undefined && obj !== null;
  }

  static isValidImageUrlPattern(url: string): boolean {
    const commonUrlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const imageUrlRegex = /(jpe?g|gif|png)(?=\?.+|$)/i;

    return commonUrlRegex.test(url) && imageUrlRegex.test(url);
  }

  static isImage(url: string): Observable<boolean> {
    const img = new Image();
    const isValidImage$ = new Subject<boolean>();
    img.src = url;
    img.onload = () => {
      isValidImage$.next(true);
      isValidImage$.complete();
    };

    img.onerror = () => {
      isValidImage$.next(false);
      isValidImage$.complete();
    };
    return isValidImage$.asObservable();
  }

  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const url: string = control.value;

    if (ImageUrlValidator.isPresent(Validators.required(control))) {
      return of(null);
    }
    if (!ImageUrlValidator.isValidImageUrlPattern(url)) {
      return of(this.validationError);
    }
    return ImageUrlValidator.isImage(url).pipe(
      map((isImage) => (isImage ? null : this.validationError))
    );
  }
}
