import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {TaskService} from "../../../services/task.service";
import {ActivatedRoute} from "@angular/router";
import {Task} from "../../../types/task.types";

@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailsComponent implements OnInit {
  taskById: Task[] | undefined

  constructor(private taskService: TaskService, private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap
    const taskIdForDetails = Number(routeParams.get('taskId'))
    this.taskById = this.taskService.getTaskByID(taskIdForDetails)
  }
}
