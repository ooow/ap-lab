import { AbstractControl, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import * as validator from './isNumber.validator';

describe('IsNumberValidator', () => {
  const validationResult = (value: number | string) => {
    let result: ValidationErrors | null;
    let control = { value } as AbstractControl;
    validator.isNumberValidator(control).subscribe((res) => {
      result = res;
    });
    return result;
  };

  it('should return null if value is a number', () => {
    expect(validationResult(20)).toBeNull();
  });

  it('should return error when value is not a number', () => {
    expect(validationResult('test')).toEqual({
      ValidationError: 'The value is not a number'
    });
  });
});
