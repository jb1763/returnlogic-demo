import { AbstractControl, ValidatorFn } from '@angular/forms';

export class CustomValidation { 

    static emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
    static phoneRegex = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/
    static dateRegex = /^\d{1,2}\/\d{1,2}\/\d{4}$/;
      /**
       * 
       * Custom validator to run generic stateless function to validate.
       * ensure that original function receives any value not created in scope as a parameter,
       * because it won't have access to the "this" context
       * 
       * Add to Control with Set Validator after forGroup creation.
       * 
       * @param errorName: name of the error being returned
       * @param args: list of arguments to pass into function f
       * @param f: a function that returns true if validation passes, false otherwise
       */
      private static functionBasedValidator(f: (...args: any[]) => boolean, args: any[], errorName: string="customError"): ValidatorFn {
          return (c: AbstractControl): {[key: string]: boolean} | null => {
              if (args.length < f.length) {
                  console.error('Validating function expects more inputs');
              }
              const valid: boolean = f(...args);
              if(!valid){
                  return {[errorName]: true};
              }
              return null;
          }
      }
  
      static dateBeforeValidator(input: Date, target: Date, errorName:string='dateBefore') : ValidatorFn {
        const validatingFunction = (input: Date, target: Date) => {
          console.log('input', input, 'target', target)
          console.log(input < target)
          return input < target;
        }
        return this.functionBasedValidator(validatingFunction, [input, target], errorName);
      }
  }
  