import { Injectable } from '@angular/core';
import {Task} from "../types/task.types";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskData: Task[] = [{
    id: 1,
    taskName: 'Interview Screening',
    taskDescription: 'Screening Interview for chilling',
    taskStartDate: 'Fri Aug 26 2022 14:47:37 GMT+0500 (Pakistan Standard Time)',
    taskEndDate: 'Fri Aug 26 2022 15:00:37 GMT+0500 (Pakistan Standard Time)',
    taskAssignee: 'Mr. Jingle',
  },{
    id: 2,
    taskName: 'Submit the task',
    taskDescription: 'Technical Interview which lasted for half an hour',
    taskStartDate: 'Fri Aug 26 2022 18:30:37 GMT+0500 (Pakistan Standard Time)',
    taskEndDate: 'Fri Aug 26 2022 2022 19:30:37 GMT+0500 (Pakistan Standard Time)',
    taskAssignee: 'Testing Assignee',
  },{
    id: 3,
    taskName: 'Submit the task',
    taskDescription: 'A Todo Application to submit for evaluation',
    taskStartDate: 'Mon Aug 29 2022 14:47:37 GMT+0500 (Pakistan Standard Time)',
    taskEndDate: 'Tue Aug 30 2022 14:47:37 GMT+0500 (Pakistan Standard Time)',
    taskAssignee: 'Testing Assignee',
  }]
  constructor() { }

  getData(): Task[] {
    return this.taskData;
  }
}
