import { AbstractControl, ValidationErrors } from '@angular/forms';
import { take } from 'rxjs/operators';

import { ImageUrlValidator } from './image-url.validator';

describe('ImageUrlValidator', () => {
  let imageUrlValidator: ImageUrlValidator;

  const expectedError = {
    url: true
  };

  const validationResult = (value: string) => {
    const mockControl = { value } as AbstractControl;
    let result: ValidationErrors | null;
    imageUrlValidator
      .validate(mockControl)
      .pipe(take(1))
      .subscribe((res) => {
        result = res;
      });
    return result;
  };

  beforeEach(() => {
    imageUrlValidator = new ImageUrlValidator();
  });

  it('should return observable null if value is empty', () => {
    expect(validationResult('')).toBeNull();
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

  it('should return call isImageUrl method when url match pattern', async () => {
    spyOn(imageUrlValidator, 'isImage').and.callThrough();
    const imageUrlOne =
      'https://www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.jpg';
    const imageUrlTwo =
      'www.royal-canin.ru/upload/iblock/117/avstr.ovcharka2.gif';
    const imageUrlThree =
      'https://www.snopes.com/tachyon/2020/03/ss_corona_beer.png?resize=865,452';

    expect(imageUrlValidator.isImage).toHaveBeenCalledTimes(0);
    imageUrlValidator.validate({ value: imageUrlOne } as AbstractControl);
    expect(imageUrlValidator.isImage).toHaveBeenCalledTimes(1);
    imageUrlValidator.validate({ value: imageUrlTwo } as AbstractControl);
    expect(imageUrlValidator.isImage).toHaveBeenCalledTimes(2);
    imageUrlValidator.validate({ value: imageUrlThree } as AbstractControl);
    expect(imageUrlValidator.isImage).toHaveBeenCalledTimes(3);
  });
});
