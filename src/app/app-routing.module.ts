import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkeletonComponent } from './skeleton/skeleton.component';
import { EditTaskComponent } from './skeleton/skeleton-body/edit-task/edit-task.component';
import { GridViewComponent } from './skeleton/skeleton-body/grid-view/grid-view.component';

const routes: Routes = [
  {
    path: '', component: SkeletonComponent,
  },
  {
    path: 'app-edit-task/:id', component: EditTaskComponent,
  },
  {
    path: 'grid', component: GridViewComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
