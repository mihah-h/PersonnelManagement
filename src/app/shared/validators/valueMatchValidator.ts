import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function valueMatchValidator(firstControlName: string, secondControlName: string): ValidatorFn{
  return (group: AbstractControl): ValidationErrors | null => {

    const firstControlValue = group.get(firstControlName)!.value
    const secondControlValue = group.get(secondControlName)!.value

    if (!firstControlValue || !secondControlValue) {
      return null
    }

    return firstControlValue === secondControlValue ? null : {valueMatch: true}
  }
}
