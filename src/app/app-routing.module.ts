import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {TasksComponent} from "./tasks/tasks.component";
import {TaskDetailsComponent} from "./tasks/task-details/task-details.component";

const routes: Routes = [
  {
    path: '', component: TasksComponent
  }, {
    path: 'detail/:taskId', component: TaskDetailsComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
