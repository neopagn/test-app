import {  Injectable } from '@angular/core';
import {
  AbstractControl,
  AsyncValidator,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';
import { catchError, map, Observable, of } from 'rxjs';

/// a password must have 8 letters, a CAPITAL, a regular, a number, and a speci@al character.
/**
 *
 */

const restrict: RegExp = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^a-zA-Z0-9]).+$/;
@Injectable({
  providedIn: 'root',
})
export class passwordValidator implements AsyncValidator {
  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    const psw = control.value;
    return of(restrict.test(psw)).pipe(
      map(this.handlePasswordValidate),
      catchError(this.handleError)
    );
  }
  private handlePasswordValidate(isWrong: boolean): ValidationErrors | null {
    if (isWrong) return null;
    else return { lackSecurity: true };
  }

  private handleError(error: any) {
    console.error('password error: ', error);
    return of(null);
  }
}
