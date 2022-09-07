import {Component, OnDestroy, OnInit} from '@angular/core';
import { Task } from 'src/types/task.types';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy
{

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

  ngOnInit(): void {
    localStorage.setItem('initialFilters', '')
    const initailData = JSON.stringify(this.taskData)
    localStorage.setItem('taskData', initailData)
  }
  title = 'taskJing';

  ngOnDestroy() {
    localStorage.clear()
  }
}
