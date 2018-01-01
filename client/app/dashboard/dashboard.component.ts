import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TaskService } from '../services/task.service';
import { TaskModel } from '../models/task-model';

@Component({
  selector: 'dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

	/*
	 * Local variable declaration
	*/
	userId: string;
	private routerSubs: any;
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

		this.routerSubs = this._activeRoute.params.subscribe(params => this.userId = params['id']);

		this._taskSrv.getTask().subscribe(res => this.retrieveTaskByFlag(res));
	}

	/*
	 * @func retrieveTaskByFlag()
	 * @return void
	 * Subscribe router param to show active user on the page
	*/
	retrieveTaskByFlag(result):void {
		this.completedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.completed);
		this.inCompletedTaskLs = this._taskSrv.getTaskByFlag(result, this.taskStatusFlag.inCompleted);
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
