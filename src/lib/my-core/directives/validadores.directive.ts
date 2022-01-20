import { Directive, ElementRef, forwardRef } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn } from '@angular/forms';

export function EsMayusculas(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value.toLocaleUpperCase() === control.value)
        return null;
      else
        return { esmayusculas: 'Tiene que estar en mayúsculas' }
  };
}

@Directive({
  selector: '[esmayusculas][formControlName],[esmayusculas][formControl],[esmayusculas][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EsMayusculasValidator, multi: true }]
})
export class EsMayusculasValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return EsMayusculas()(control);
  }
}

export function EsNIF(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      const err = { nif: { invalidFormat: true, invalidChar: true, message: 'No es un nif valido' } };
      if (/^\d{1,8}\w$/.test(control.value)) {
          const letterValue = control.value.substr(control.value.length - 1);
          const numberValue = control.value.substr(0, control.value.length - 1);
          err.nif.invalidFormat = false;
          return letterValue.toUpperCase() === 'TRWAGMYFPDXBNJZSQVHLCKE'.charAt(numberValue % 23) ? null : err;
      } else { return err; }
  };
}
@Directive({
  selector: '[nif][formControlName],[nif][formControl],[nif][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NIFValidator, multi: true }]
})
export class NIFValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return EsNIF()(control);
  }
}

export function EsPasado(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value < Date())
        return null;
      else
        return { EsPasado: 'La fecha debe ser anterior a la actual' }
  };
}

@Directive({
  selector: '[EsPasado][formControlName],[EsPasado][formControl],[EsPasado][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EsPasadoValidator, multi: true }]
})
export class EsPasadoValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return EsPasado()(control);
  }
}


export function EsFuturo(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value > Date())
        return null;
      else
        return { EsPasado: 'La fecha debe ser posterior a la actual' }
  };
}

@Directive({
  selector: '[EsFuturo][formControlName],[EsFuturo][formControl],[EsFuturo][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EsFuturoValidator, multi: true }]
})
export class EsFuturoValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return EsPasado()(control);
  }
}

export function Precio(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value === 'pizza.calculatePrice()')
        return null;
      else
        return { Precio: 'El precio es incorrecto' }
  };
}

@Directive({
  selector: '[Precio][formControlName],[Precio][formControl],[Precio][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: PrecioValidator, multi: true }]
})
export class PrecioValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return Precio()(control);
  }
}

export function EsMayor(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value > 0)
        return null;
      else
        return { EsMayor: 'El número es menor que cero' }
  };
}

@Directive({
  selector: '[EsMayor][formControlName],[EsMayor][formControl],[EsMayor][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: EsMayorValidator, multi: true }]
})
export class EsMayorValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return EsMayor()(control);
  }
}

export function Ingredientes(): ValidatorFn {
  return (control: AbstractControl): { [key: string]: any } | null => {
      if (!control.value) { return null; }
      if(control.value > 'pizza.getIngredients().length()')
        return null;
      else
        return { Ingredientes: 'La pizza debe tener al menos cuatro ingredientes' }
  };
}

@Directive({
  selector: '[Ingredientes][formControlName],[Ingredientes][formControl],[Ingredientes][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: IngredientesValidator, multi: true }]
})
export class IngredientesValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return Ingredientes()(control);
  }
}

export function NotBlank(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    return control.value?.trim() ? null : { NotBlank: 'No puede estar en blanco' }
  };
}

@Directive({
  selector: '[NotBlank][formControlName],[NotBlank][formControl],[NotBlank][ngModel]',
  providers: [{ provide: NG_VALIDATORS, useExisting: NotBlankValidator, multi: true }]
})
export class NotBlankValidator implements Validator {
  validate(control: AbstractControl): ValidationErrors | null {
      return NotBlank()(control);
  }
}

@Directive({
  selector: '[type][formControlName],[type][formControl],[type][ngModel]',
  providers: [
      { provide: NG_VALIDATORS, useExisting: forwardRef(() => TypeValidator), multi: true }
  ]
})
export class TypeValidator implements Validator {
  constructor(private elem: ElementRef) { }
  validate(control: AbstractControl): ValidationErrors | null {
      const valor = control.value;
      if (valor) {
        const dom = this.elem.nativeElement;
        if (dom.validity) { // dom.checkValidity();
          return dom.validity.typeMismatch ? { 'type': dom.validationMessage } : null;
        }
      }
      return null;
  }
}

export const MIS_VALIDADORES = [EsMayusculasValidator, NIFValidator, NotBlankValidator, TypeValidator]
