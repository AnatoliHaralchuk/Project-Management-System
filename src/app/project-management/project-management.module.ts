import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { WelcomePageComponent } from './pages/welcome-page/welcome-page.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { RouterModule, Routes } from '@angular/router';
import { CaruselComponent } from './components/carusel/carusel.component';
import { AuthGuard } from '../auth/auth.guard';
import { BoardComponent } from './components/board/board.component';
import { ColumnComponent } from './components/column/column.component';
import { BoardPageComponent } from './pages/board-page/board-page.component';
import { ColumnPageComponent } from './pages/column-page/column-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  { path: 'main', component: MainPageComponent, canActivate: [AuthGuard], children: [
      { path: '', redirectTo: '/main/board', pathMatch: 'full' },
      { path:'board', component: BoardPageComponent },
      { path: 'board/column', component: ColumnPageComponent },
    ] },
];
@NgModule({
  declarations: [
    WelcomePageComponent,
    MainPageComponent,
    CaruselComponent,
    BoardComponent,
    ColumnComponent,
    BoardPageComponent,
    ColumnPageComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  exports: [RouterModule],
})
export class ProjectManagementModule {}
