import { AbstractControl, ValidationErrors } from '@angular/forms';
import { of } from 'rxjs';
import { take } from 'rxjs/operators';

import * as validator from './image-url.validator';

describe('ImageUrlValidator', () => {
  const expectedError = {
    url: true
  };

  const validationResult = (value: string) => {
    const mockControl = { value } as AbstractControl;
    let result: ValidationErrors | null;

    validator
      .imageUrlValidator(mockControl)
      .pipe(take(1))
      .subscribe((res) => {
        result = res;
      });
    return result;
  };

  it('should return observable error if value is empty', () => {
    expect(validationResult('')).toEqual(expectedError);
  });

  it('should return observable error when url is a non image url', () => {
    const testNonImageUrl =
      'https://github.com/vnazarchukGD/angular-time-killer';

    expect(validationResult(testNonImageUrl)).toEqual(expectedError);
  });

  it('should return observable error when url is a random string', () => {
    const testRandomString = 'random-string';

    expect(validationResult(testRandomString)).toEqual(expectedError);
  });

  it('should call isImageUrl method when url match pattern', async () => {
    spyOn(validator, 'isValidImage').and.returnValue(of(true));
    const { isValidImage, imageUrlValidator } = validator;
    const imageUrlOne =
      'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg';
    const imageUrlTwo =
      'www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.gif';
    const imageUrlThree =
      'https://www.snopes.com/tachyon/2020/03/ss_corona_beer.png?resize=865,452';

    expect(isValidImage).toHaveBeenCalledTimes(0);
    imageUrlValidator({ value: imageUrlOne } as AbstractControl);
    expect(isValidImage).toHaveBeenCalledTimes(1);
    imageUrlValidator({ value: imageUrlTwo } as AbstractControl);
    expect(isValidImage).toHaveBeenCalledTimes(2);
    imageUrlValidator({ value: imageUrlThree } as AbstractControl);
    expect(isValidImage).toHaveBeenCalledTimes(3);
  });
});
