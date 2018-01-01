import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task-model';

import { AddNewTaskComponent } from './add-new-task/add-new-task.component';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	/*
	 * Local variable declaration
	*/
	private routerSubs: any;

	isAdd: boolean;

	userId: string;

	taskStatusFlag = {
		completed: 'completed',
		inCompleted: 'notCompleted',
	};

	completedTaskLs: Array<TaskModel>;

	inCompletedTaskLs: Array<TaskModel>;

	constructor(private _activeRoute: ActivatedRoute, private _taskSrv:TaskService) { }

	/*
	 * @func ngOnInit()
	 * @return void
	 * Subscribe router param to show active user on the page
	*/
	ngOnInit():void {

		this.isAdd = false;

		this.routerSubs = this._activeRoute.params.subscribe(params => this.userId = params['id']);

		this._taskSrv.getTask().subscribe(res => this.retrieveTaskByFlag(res));
	}

	/*
	 * @func retrieveTaskByFlag()
	 * @return void
	 * @param result: Response data from getTask service
	 * Filter out tasks list by sending status to @method getTaskByFlag()
	*/
	retrieveTaskByFlag(result: any):void {
		this.completedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.completed);
		this.inCompletedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.inCompleted);
	}

	/*
	 * @func onTaskComplete()
	 * @return void
	 * @param idx: completed task id
	 * Update task list by sending completed task id to @method changeTaskStatus()
	*/
	onTaskComplete(idx:number):void {

		this._taskSrv.changeTaskStatus(idx);
		
	}

	/*
	 * @func onTaskClose()
	 * @return void
	 * @param idx: close task id
	 * Remove task from list by sending close task id to @method taskClose()
	*/
	onTaskClose(idx:number): void {

		this._taskSrv.taskClose(idx);
	}

	/*
	 * @func onAddEnable()
	 * @return void
	 * Display add new task form to user
	*/
	onAddEnable(): void {
		this.isAdd = true;
	}

	/*
	 * @func isCancelFunc()
	 * @return void
	 * @param isCancel: If user has cancel to new task window
	 * Hide add new task window without adding new task to the task list
	*/
	isCancelFunc(isCancel: boolean): void {
		this.isAdd = isCancel;
	}

	/*
	 * @func isCancelFunc()
	 * @return void
	 * @param isCancel: If user has cancel to new task window
	 * Hide add new task window without adding new task to the task list
	*/
	onAddNewTask(): void {
		this.isAdd = false;
	}

	/*
	 * @func onTaskDelete()
	 * @return void
	 * @param isCancel: If user has cancel to new task window
	 * Hide add new task window without adding new task to the task list
	*/
	onTaskDelete(idx:number): void {

		this._taskSrv.taskDelete(idx);
	}

	/*
	 * @func ngOnDestroy()
	 * @return void
	 * Unsubscribe router param
	*/
	ngOnDestroy():void {
		this.routerSubs.unsubscribe();
	}

}
