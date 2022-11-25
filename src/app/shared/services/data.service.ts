import { Injectable, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class DataService implements OnInit {

  constructor(private translateService: TranslateService) { }

  lang: string = localStorage.getItem('lang') ? localStorage.getItem('lang')! : 'ru';

  setLanguage(languageCode: string) {
    this.translateService.use(languageCode);
    this.lang = languageCode;
    localStorage.setItem('lang', this.lang);
  }

  ngOnInit() {
    this.translateService.use(this.lang!);
  }
}
