import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';

export const isNumberValidator = (
  control: AbstractControl
): Observable<ValidationErrors | null> => {
  const val = Number(control.value);
  if (isNaN(val)) {
    return of({ ValidationError: 'The value is not a number' });
  } else {
    return of(null);
  }
};
