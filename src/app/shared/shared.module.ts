import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FilterPipe } from './pipes/filter.pipe';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [FilterPipe],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  exports: [
    TranslateModule,
    FilterPipe,
  ],
})
export class SharedModule {}
