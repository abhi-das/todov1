import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

	/*
	 * Local variable declaration
	*/
	loginForm: FormGroup;

	constructor(private _route: Router) {}

	/*
	 * @func ngOnInit()
	 * @return void
	 * @variable loginForm: create FormGroup and add FormControls
	*/
	ngOnInit():void {
		this.loginForm = new FormGroup({
			userid: new FormControl(),
			password: new FormControl()
		});
	}

	/*
	 * @func onAuth()
	 * @return void
	 * Redirect to dashboard page with the userid as route param
	*/
	onAuth():void {
		// console.log(this.loginForm.value);
		this._route.navigate(['/dashboard', this.loginForm.value.userid ])
	}

}
