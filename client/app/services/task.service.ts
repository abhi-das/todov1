import { Injectable, OnInit,Inject, PLATFORM_ID, Injector } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import { TaskModel } from '../models/task-model';

@Injectable()

export class TaskService {

	/*
		// Need 2 Subject Observerables
		- completed task list
		- incomplete task list
	*/

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

	/*
	 * @func changeTaskStatus()
	 * @param id: index of incomplete task which is not completed
	 * @param completedTaskLs: as TaskModel[]
	 * @param inCompleteTaskLs: filter by flag type
	 * @return object completedTaskLs[] and inCompleteTaskLs[]
	 * @purpose update complete and incomplete task list
	*/
	changeTaskStatus(id:number, completedTaskLs: TaskModel[], inCompleteTaskLs: TaskModel[]) {

		completedTaskLs.push(inCompleteTaskLs[id]);
		inCompleteTaskLs.splice(id, 1);

		return {inCompleteTaskLs, completedTaskLs};
	}

	/*
	 * @func taskClose()
	 * @param id: index of incomplete task which is not completed
	 * @param completedTaskLs: as TaskModel[]
	 * @return completedTaskLs[]
	 * @purpose update completed task list on task close
	*/
	taskClose(id:number, completedTaskLs: TaskModel[]): TaskModel[] {

		completedTaskLs.splice(id, 1);

		return completedTaskLs;
	}


	/*
	 * @func updateTaskList()
	 * @param task: get the new task from user
	 * @return incompleteTaskLs[]
	 * @purpose update incompleted task list on task add new task
	*/
	updateTaskList(task: TaskModel) {

		/*
			* Just update incomplete taks list overserable
		*/
		// return completedTaskLs;
	}


}