import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

const VALIDATION_ERROR = { url: true };

const isValidImageUrlPattern = (url: string): boolean => {
  const commonUrlRegex = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
  const imageUrlRegex = /(jpe?g|gif|png)(?=\?.+|$)/i;

  return commonUrlRegex.test(url) && imageUrlRegex.test(url);
};

export const isValidImage = (url: string): Observable<boolean> => {
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
};

export const imageUrlValidator = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  const url: string = control.value;

  if (!isValidImageUrlPattern(url)) {
    return of(VALIDATION_ERROR);
  }
  return isValidImage(url).pipe(
    map((isImage) => (isImage ? null : VALIDATION_ERROR))
  );
};
