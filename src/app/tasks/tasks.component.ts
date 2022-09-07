import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {NzMessageService} from 'ng-zorro-antd/message';
import {TaskService} from 'src/services/task.service';
import {Task} from 'src/types/task.types';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit {
  applicationName: string = 'Todo Application'
  todoForm!: UntypedFormGroup
  loading = false
  taskData: Task[] | any | undefined
  isEdit: boolean = false
  addNewTask: boolean = false
  initialFilters: Task | undefined

  constructor(
    private message: NzMessageService,
    private fb: UntypedFormBuilder,
    private taskService: TaskService,
    private i18n: NzI18nService) {
    this.i18n.setLocale(en_US)
    this.todoForm = this.fb.group({
      id: [],
      taskName: [null, [Validators.required]],
      taskDescription: [null, [Validators.required]],
      taskStartDate: [null, [Validators.required]],
      taskEndDate: [null, [Validators.required]],
      taskAssignee: [null, [Validators.required]],
    })
  }

  ngOnInit(): void {
    this.initialFilters = JSON.parse(localStorage.getItem('initialFilters') || '')
    this.getTasks(this.initialFilters)
  }

  submitForm(): void {
    if (this.todoForm.valid) {
      const formData: Task = this.todoForm.value
      formData.taskStartDate = this.taskService.convertDateToString(formData.taskStartDate)
      formData.taskEndDate = this.taskService.convertDateToString(formData.taskEndDate)
      if (this.isEdit) {
        this.taskData = this.taskData.map((task: Task) => task.id !== formData.id ? task : formData)
        this.isEdit = false
      } else {
        formData.id = this.taskData.length === 0 ? 1 : this.taskData.length + 1
        this.taskData.push(formData)
      }
      this.addNewTask = false
      this.todoForm.reset()
      this.message.success('Request Successful')
    } else {
      Object.values(this.todoForm.controls).forEach(control => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({onlySelf: true});
        }
      });
      this.message.error('Please Fill the Fields first')
    }
  }

  addTask(type: string) {
    this.todoForm.reset()
    this.isEdit = false
    this.addNewTask = true
  }

  onEdit(task: Task) {
    this.addNewTask = true
    this.todoForm.patchValue(task)
    this.isEdit = true
  }

  onDelete(task: Task) {
    let editedTask: Task = this.taskData.find((taskFromData: Task) => {
      return task.id === taskFromData.id
    })
    const taskUpdateIndex = this.taskData.findIndex((u: { id: number }) => u.id === editedTask.id)
    this.taskData.splice(taskUpdateIndex, 1)
    this.message.success('Deleted Successful')
    if (this.todoForm.value) {
      this.todoForm.reset()
    }
  }

  getTasks(data: Task | undefined) {
    const taskFilters = JSON.stringify(data)
    localStorage.setItem('initialFilters', taskFilters)
    this.taskData = this.taskService.getData()
    if (data?.taskName || data?.taskDescription || data?.taskAssignee || data?.taskStartDate || data?.taskEndDate) {
      this.taskData = this.taskData.filter((task: Task) => {
        return task.taskName.toLowerCase().includes(data.taskName.toLowerCase()) &&
        task.taskAssignee.toLowerCase().includes(data.taskAssignee.toLowerCase()) &&
        task.taskDescription.toLowerCase().includes(data.taskDescription.toLowerCase()) &&
        task.taskStartDate ? task.taskStartDate.includes(data.taskStartDate) : '' &&
        task.taskEndDate ? task.taskEndDate.includes(data.taskEndDate) : ''
      })
    }
  }
}

