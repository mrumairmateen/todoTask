import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NzGridModule} from "ng-zorro-antd/grid";
import {NzLayoutModule} from "ng-zorro-antd/layout";
import {NzBreadCrumbModule} from "ng-zorro-antd/breadcrumb";
import {NzMenuModule} from "ng-zorro-antd/menu";
import {NzCardModule} from "ng-zorro-antd/card";
import {NzAvatarModule} from "ng-zorro-antd/avatar";
import {NzIconModule} from "ng-zorro-antd/icon";
import {NzEmptyModule} from "ng-zorro-antd/empty";
import {ReactiveFormsModule} from "@angular/forms";
import {NzInputModule} from "ng-zorro-antd/input";
import {NzFormModule} from "ng-zorro-antd/form";
import {NzButtonModule} from "ng-zorro-antd/button";
import {NzModalModule} from "ng-zorro-antd/modal";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {NzDatePickerModule} from "ng-zorro-antd/date-picker";
import {NzListModule} from "ng-zorro-antd/list";
import {NzTableModule} from "ng-zorro-antd/table";
import {NzDividerModule} from "ng-zorro-antd/divider";
import {NzMessageModule} from 'ng-zorro-antd/message';
import {NzPopconfirmModule} from "ng-zorro-antd/popconfirm";
import {TasksComponent} from './tasks/tasks.component';
import {TaskListComponent} from './tasks/task-list/task-list.component';
import {TaskDetailsComponent} from './tasks/task-details/task-details.component';
import {TaskSearchComponent} from './tasks/task-search/task-search.component';
import {NzDescriptionsModule} from "ng-zorro-antd/descriptions";
import {HttpClientModule} from "@angular/common/http";
import {NzPageHeaderModule} from "ng-zorro-antd/page-header";
import {NzSpaceModule} from "ng-zorro-antd/space";
import {NzToolTipModule} from "ng-zorro-antd/tooltip";

// @ts-ignore
@NgModule({
  declarations: [
    AppComponent,
    TasksComponent,
    TaskListComponent,
    TaskDetailsComponent,
    TaskSearchComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NzGridModule,
    NzLayoutModule,
    NzBreadCrumbModule,
    NzMenuModule,
    NzCardModule,
    NzAvatarModule,
    NzIconModule,
    NzEmptyModule,
    ReactiveFormsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    NzModalModule,
    BrowserAnimationsModule,
    NzDatePickerModule,
    NzListModule,
    NzTableModule,
    NzDividerModule,
    NzMessageModule,
    NzPopconfirmModule,
    NzDescriptionsModule,
    HttpClientModule,
    NzPageHeaderModule,
    NzSpaceModule,
    NzToolTipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
