import { FormControl } from '@angular/forms';

export class StrongPassValidator {
  static strongPassword(control: FormControl): { [key: string]: boolean } | null {
    const upLetters: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZАБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ';
    const downLetters: string = 'abcdefghijklmnopqrstuvwxyzабвгдеёжзийклмнопрстуфхцчшщъыьэюя';
    const num: string = '0123456789';
    const spec: string = '!@#?';
    const isUp: boolean = StrongPassValidator.includesSub(upLetters, control);
    const isDown: boolean = StrongPassValidator.includesSub(downLetters, control);
    const isNum: boolean = StrongPassValidator.includesSub(num, control);
    const isSpec: boolean = StrongPassValidator.includesSub(spec, control);
    if (control.value?.length < 8) {
      return { minlength: true };
    } else if (!isUp || !isDown) {
      return { mixtureCase: true };
    } else if (!isNum) {
      return { mixtureNum: true };
    } else if (!isSpec) {
      return { inclusionSymbol: true };
    }
    return null;
  }

  private static includesSub(str: string, control: FormControl): boolean {
    for (let i of str) {
      if (control.value?.includes(`${i}`)) return true;
    }
    return false;
  }
}
