import {Injectable} from '@angular/core';
import {Task} from "../types/task.types";

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  taskData: Task[] = [{
    id: 1,
    taskName: 'Interview Screening',
    taskDescription: 'Screening Interview for chilling',
    taskStartDate: '2022-08-25',
    taskEndDate: '2022-08-25',
    taskAssignee: 'Mr. Jingle',
  }, {
    id: 2,
    taskName: 'Submit the task',
    taskDescription: 'Technical Interview which lasted for half an hour',
    taskStartDate: '2022-08-26',
    taskEndDate: '2022-08-26',
    taskAssignee: 'Testing Assignee',
  }, {
    id: 3,
    taskName: 'Submit the task',
    taskDescription: 'A Todo Application to submit for evaluation',
    taskStartDate: '2022-08-27',
    taskEndDate: '2022-08-27',
    taskAssignee: 'Testing Assignee',
  }]

  constructor() {
  }

  getData(): Task[] {
    return this.taskData;
  }

  getTaskByID(id: number) {
    return this.taskData.filter((task: Task) => task.id === id)
  }

  convertDateToString(date: string) {
    let today = new Date(date);
    return today.toISOString().substring(0, 10)
  }

}
