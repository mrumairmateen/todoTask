import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Task} from "../../../types/task.types";
import {TaskService} from "../../../services/task.service";

@Component({
  selector: 'app-task-search',
  templateUrl: './task-search.component.html',
  styleUrls: ['./task-search.component.css']
})
export class TaskSearchComponent implements OnInit {
  @Input() formData: Task | undefined
  @Output() taskFilterData = new EventEmitter<Task>()
  @Output() addTask = new EventEmitter<string>()
  searchForm!: UntypedFormGroup
  resetButton: boolean = false

  constructor(private fb: UntypedFormBuilder, private taskService: TaskService) {
    this.searchForm = this.fb.group({
      taskName: [''],
      taskDescription: [''],
      taskStartDate: [''],
      taskEndDate: [''],
      taskAssignee: ['']
    })
  }

  ngOnInit(): void {
    this.searchForm.patchValue(this.formData || {})
  }

  onAddTask() {
    this.addTask.emit('add')
  }

  onSubmitSearch() {
    const formData: Task = this.searchForm.value
    formData.taskStartDate = formData.taskStartDate ? this.taskService.convertDateToString(formData.taskStartDate) : ''
    formData.taskEndDate = formData.taskEndDate ? this.taskService.convertDateToString(formData.taskEndDate) : ''
    this.taskFilterData.emit(formData)
    this.resetButton = true
  }
}
