import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';

@NgModule({
  declarations: [WelcomePageComponent, MainPageComponent],
  imports: [CommonModule],
})
export class ProjectManagementModule {}
