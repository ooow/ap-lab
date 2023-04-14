import { AbstractControl, FormArray, FormControl, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';
import { Observable, of } from 'rxjs';

const VALIDATION_ERROR = { message: "Enter a valid number" };

// export const isNumberValidator = ( control: AbstractControl): Observable<ValidationErrors | null> => {

//     const val = Number(control.value);
//     console.log(val)
//     if (isNaN(val)) {
//         return of(VALIDATION_ERROR);
//     } else {
//         return of(null);
//     }

// };

export function isNumberValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        return !isNaN(control.value) ? null : { invalidNumber: 'Enter a valid number' }
    }
    
}

// export function isNumberValidatorArray(): ValidatorFn {
//     return (formArray: FormArray): { [key: string]: any } | null => {
//         let valid: boolean = true;
//         formArray.controls.forEach((x: FormControl) => {
//             console.log(x.value)
//             valid = valid && !isNaN(x.value)
//         })
//         return valid ? null :  { isNotAValidNum: 'Enter a valid number' }
//     }
// };

// export function isNumberValidatorArrayGroup(fieldName?: string): ValidatorFn {
//     return (formArray: FormArray): { [key: string]: any } | null => {
//         let valid: boolean = true;
//         formArray.controls.forEach((x: FormGroup) => {
//             console.log(x.value)
//             valid = valid && !isNaN(x.value)
//         })
//         return valid ? null : { isNotAValidNum: 'Enter a valid number' }
//     }
// };
