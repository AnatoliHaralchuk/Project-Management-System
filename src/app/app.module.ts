import { NgModule, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AuthModule } from './auth/auth.module';
import { CoreModule } from './core/core.module';
import { ProjectManagementModule } from './project-management/project-management.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ApiUrlInterceptor } from './apiUrl.interceptor';

const INTERCEPTOR_ADDAPIURL: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ApiUrlInterceptor,
  multi: true,
};

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    CoreModule,
    ProjectManagementModule,
    BrowserAnimationsModule,
  ],
  providers: [INTERCEPTOR_ADDAPIURL],
  bootstrap: [AppComponent],
})
export class AppModule {}
