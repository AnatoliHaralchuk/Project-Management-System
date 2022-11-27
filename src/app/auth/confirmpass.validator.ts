import { FormControl } from '@angular/forms';

export class ConfirmPassValidator {
  static confirmPassword(control: FormControl): { [key: string]: boolean } | null {
    if (control.parent?.value.password !== control.value) {
      return { confirm: true };
    }
    return null;
  }
}
