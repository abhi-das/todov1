import { Injectable, OnInit,Inject, PLATFORM_ID, Injector } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TaskModel } from '../models/task-model';

@Injectable()

export class TaskService {

	constructor(private _http: Http, @Inject(PLATFORM_ID) private platformId: Object,
			private injector: Injector) {}

	/*
	 * @func getTask()
	 * @return Observable<TaskModel[]>
	 * @variable host: Get host url from server and fetch data from server folder (localhost, www.hostsite.com/ etc.)
	 * @variable platformId: angular notify if request coming from server or browser
	*/
	getTask(): Observable<TaskModel[]> {

		let host = '';

		if(this.platformId == 'server') {		
			host = this.injector.get('serverUrl');
		}

		return this._http.get(host+"/data/todo_data.json")
					.map((taskRes: Response) => taskRes.json()
						.tasks.map((task: TaskModel) => new TaskModel().deserialize(task)));

	}

	/*
	 * @func getTaskByStatus()
	 * @param resTaskList: as TaskModel[]
	 * @param flag: filter by flag type
	 * @return TaskModel[]
	 * @purpose filter task list by status/flag
	*/
	getTaskByFlag(resTaskList: TaskModel[], flag: string): TaskModel[] {

		return resTaskList.filter((taskLs) => {
			if(taskLs['status'] === flag) {
				return taskLs;
			}
		});
	}

}