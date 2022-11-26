import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(private translateService: TranslateService) {
    this.translateService.use(this.lang!);
  }

  lang: string = localStorage.getItem('lang') ? localStorage.getItem('lang')! : 'ru';

  setLanguage(languageCode: string) {
    this.translateService.use(languageCode);
    this.lang = languageCode;
    localStorage.setItem('lang', this.lang);
  }
}
