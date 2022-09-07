import {ChangeDetectionStrategy, Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../types/task.types";

@Component({
  selector: 'task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class TaskListComponent {

  @Input() taskData: Task[] = []
  @Output() editTask = new EventEmitter<Task>();
  @Output() deleteTask = new EventEmitter<Task>();

  constructor() {
  }

  onEdit(task: Task) {
    this.editTask.emit(task)
  }

  onDelete(task: Task) {
    this.deleteTask.emit(task)
  }

}
