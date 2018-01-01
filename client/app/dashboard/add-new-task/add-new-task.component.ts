import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { TaskService } from '../../services/task.service';
import { TaskModel } from '../../models/task-model';

@Component({
  selector: 'add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.scss'],
  outputs: ['cancelEvent']
})
export class AddNewTaskComponent implements OnInit {

	/*
	 * Local variable declaration
	*/
	private cancelEvent = new EventEmitter<boolean>();

	addNewTaskForm: FormGroup;

	constructor(private _LoginSrv: LoginService, private _taskSrv: TaskService) { }

	/*
	 * @func ngOnInit()
	 * @return void
	 * Subscribe router param to show active user on the page
	*/
	ngOnInit() {

		this.addNewTaskForm = new FormGroup({
			title: new FormControl(),
			description: new FormControl()
		});
	}

	/*
	 * @func onCancel()
	 * @return void
	 * Emit cancel event to parent component to notify the user has cancel the action
	*/
	onCancel(): void {
		this.cancelEvent.emit(false);
	}

	/*
	 * @func onAddTask()
	 * @return void
	 * Add new task to the task list
	 * @variable obj: static task format
	 * @variable newData: Merge static obj and user form data
	 * @variable taskMod: deserialize the newData object
	 * 
	*/
	onAddTask(): void {

		var obj = {
			status: "notCompleted", 
    		author: this._LoginSrv.getLoginId()
		};

		var newData = Object.assign(obj, this.addNewTaskForm.value);

		var taskMod = new TaskModel().deserialize(newData)

		this._taskSrv.updateTaskList(taskMod);

		// Call task service to add new task in the list

		this.cancelEvent.emit(false);
	}

}
