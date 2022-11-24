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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateBoardFormComponent } from './components/board/create-board-form/create-board-form.component';
import { EditBoardFormComponent } from './components/board/edit-board-form/edit-board-form.component';
import { DeleteFormComponent } from './components/delete-form/delete-form.component';
import { CreateColumnFormComponent } from './components/column/create-column-form/create-column-form.component';
import { EditColumnFormComponent } from './components/column/edit-column-form/edit-column-form.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TaskComponent } from './components/task/task.component';
import { CreateTaskFormComponent } from './components/task/create-task-form/create-task-form.component';
import { EditTaskFormComponent } from './components/task/edit-task-form/edit-task-form.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  { path: 'welcome', component: WelcomePageComponent },
  {
    path: 'main',
    component: MainPageComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '/main/board', pathMatch: 'full' },
      { path: 'board', component: BoardPageComponent },
      { path: 'board/:id/column', component: ColumnPageComponent },
    ],
  },
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
    CreateBoardFormComponent,
    EditBoardFormComponent,
    DeleteFormComponent,
    CreateColumnFormComponent,
    EditColumnFormComponent,
    TaskComponent,
    CreateTaskFormComponent,
    EditTaskFormComponent,
  ],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    DragDropModule,
  ],
  exports: [RouterModule],
})
export class ProjectManagementModule {}
