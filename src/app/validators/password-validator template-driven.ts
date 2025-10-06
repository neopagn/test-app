import { Directive, forwardRef, inject } from "@angular/core";
import { AbstractControl, AsyncValidator, NG_ASYNC_VALIDATORS, ValidationErrors } from "@angular/forms";
import { passwordValidator } from "./password-validator";
import { catchError, map, Observable, of } from "rxjs";

/// a password must have 8 letters, a CAPITAL, a regular, a number, and a speci@al character.
/**
 * 
 */

@Directive({
    selector:'[passwordValidate]',
    providers:[{
        provide: NG_ASYNC_VALIDATORS,
        useExisting: forwardRef(()=> passwordValidatorTemplateDriven),
        multi:true,
        
        
    }]
})
export class passwordValidatorTemplateDriven implements AsyncValidator {

    private readonly validator = inject(passwordValidator)
    validate(control: AbstractControl): Promise<ValidationErrors | null> | Observable<ValidationErrors | null> {
        return this.validator.validate(control);
    }
        
    

    
  }