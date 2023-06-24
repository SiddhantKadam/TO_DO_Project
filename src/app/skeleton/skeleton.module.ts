import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DialogContentExampleDialog, SkeletonBodyComponent } from './skeleton-body/skeleton-body.component';
import { SkeletonSidebarComponent } from './skeleton-sidebar/skeleton-sidebar.component';
import { SkeletonComponent } from './skeleton.component';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { TaskViewComponent } from './skeleton-body/task-view/task-view.component';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTaskComponent } from './skeleton-body/edit-task/edit-task.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { GridViewComponent } from './skeleton-body/grid-view/grid-view.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    SkeletonComponent,
    SkeletonSidebarComponent,
    SkeletonBodyComponent,
    TaskViewComponent,
    EditTaskComponent,
    DialogContentExampleDialog,
    GridViewComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTableModule,
    MatMenuModule,
    MatDialogModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatChipsModule,
    MatToolbarModule,
    MatGridListModule,
    MatSnackBarModule,
    ReactiveFormsModule, 
    MatPaginatorModule
  ]
})
export class SkeletonModule { }
