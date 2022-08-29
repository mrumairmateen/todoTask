import {Component, OnDestroy, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {TaskService} from "../../services/task.service";
import {en_US, NzI18nService} from 'ng-zorro-antd/i18n';
import {Task} from "../../types/task.types";
import {NzMessageService} from 'ng-zorro-antd/message';

@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css']
})
export class TasksComponent implements OnInit, OnDestroy {
  searchForm!: UntypedFormGroup
  todoForm!: UntypedFormGroup
  loading = false
  taskData: Task[] | any | undefined
  isEdit: boolean = false
  addNewTask: boolean = false
  resetButton: boolean = false

  constructor(private message: NzMessageService, private fb: UntypedFormBuilder, private taskService: TaskService, private i18n: NzI18nService) {
    this.i18n.setLocale(en_US)
  }

  ngOnInit(): void {
    // Todo Data from service
    this.taskData = this.taskService.getData()

    // Todo Form
    this.todoForm = this.fb.group({
      id: [],
      taskName: [null, [Validators.required]],
      taskDescription: [null, [Validators.required]],
      taskStartDate: [null, [Validators.required]],
      taskEndDate: [null, [Validators.required]],
      taskAssignee: [null, [Validators.required]],
    })

    this.searchForm = this.fb.group({
      searchField: [null]
    })
  }

  ngOnDestroy(): void {
    localStorage.clear()
  }

  // Submit Form Data
  submitForm(): void {
    if (this.todoForm.valid) {
      if (this.isEdit) {
        // Data for update
        let editedTask: Task = this.taskData.find((task: Task) => {
          return this.todoForm.controls['id'].value === task.id
        })
        const taskUpdateIndex = this.taskData.findIndex((u: { id: number }) => u.id === editedTask.id)
        let item = this.taskData[taskUpdateIndex]
        item.taskName = this.todoForm.controls['taskName'].value
        item.taskDescription = this.todoForm.controls['taskDescription'].value
        item.taskStartDate = this.todoForm.controls['taskStartDate'].value
        item.taskEndDate = this.todoForm.controls['taskEndDate'].value
        item.taskAssignee = this.todoForm.controls['taskAssignee'].value
        this.isEdit = false
      } else {
        // New Data to add
        const data: Task = this.todoForm.value
        data.id = this.taskData.length === 0 ? 1 : this.taskData.length + 1
        this.taskData.push(data)
      }
      this.addNewTask = false
      this.todoForm.reset()

      // Toast for the information
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

  // On Edit Data
  onEdit(task: Task) {
    this.addNewTask = true
    this.todoForm.patchValue(task)
    this.isEdit = true
  }

  // delete data
  onDelete(task: Task) {
    // Task Object from TaskData
    let editedTask: Task = this.taskData.find((taskFromData: Task) => {
      return task.id === taskFromData.id
    })
    // Task Index in the array
    const taskUpdateIndex = this.taskData.findIndex((u: { id: number }) => u.id === editedTask.id)

    // Removing from task Data
    this.taskData.splice(taskUpdateIndex, 1)

    // Toast for the information
    this.message.success('Deleted Successful')

    // if form got value
    if (this.todoForm.value) {
      this.todoForm.reset()
    }
  }

  addTask() {
    this.todoForm.reset()
    this.addNewTask = true
  }

  onSubmitSearch() {
    if(this.searchForm.controls['searchField'].value === null || this.searchForm.controls['searchField'].value === '' ){
      this.taskData = this.taskService.getData()
    } else{
      this.resetButton = true
      this.taskData = this.taskData.filter((task: Task) => {
        return task.taskName.toLowerCase().includes(this.searchForm.controls['searchField'].value.toLowerCase())
      })
    }
  }

  onRest(){
    this.searchForm.reset()
    this.resetButton = false
    this.taskData = this.taskService.getData()
  }
}

