import {Component, EventEmitter, OnInit, Output, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {Task} from "../../../types/task.types";
import {TaskService} from "../../../services/task.service";
import {NzMessageService} from 'ng-zorro-antd/message';

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
  isValue: boolean = false

  constructor(private fb: UntypedFormBuilder, private taskService: TaskService,
              private message: NzMessageService,) {
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
    this.searchFormValue()
  }

  searchFormValue() {
    Object.values(this.searchForm.controls).forEach(control => {
      if (control.value) {
        this.resetButton = true
      }
    });
  }

  onAddTask() {
    this.addTask.emit('add')
  }

  onResetButton() {
    this.resetButton = false
    this.taskFilterData.emit()
    this.searchForm.reset()
  }

  onSubmitSearch() {
    this.isValue = false
    Object.values(this.searchForm.controls).forEach(control => {
      if (control.value === null || control.value === '') {
        this.isValue = true
        return
      }
    });

    if (this.isValue) {
      const formData: Task = this.searchForm.value
      formData.taskStartDate = formData.taskStartDate ? this.taskService.convertDateToString(formData.taskStartDate) : ''
      formData.taskEndDate = formData.taskEndDate ? this.taskService.convertDateToString(formData.taskEndDate) : ''
      this.taskFilterData.emit(formData)
      this.resetButton = true
    } else {
      this.searchForm.reset()
      this.message.info('Please Enter Something to Search')
    }
  }
}
