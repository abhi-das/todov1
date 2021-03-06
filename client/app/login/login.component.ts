import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

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

	constructor(private _route: Router, private _LoginSrv: LoginService) {}

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
		var tmpUserid = this.loginForm.value.userid;
		
		this._LoginSrv.setLoginId(tmpUserid);

		this._route.navigate(['/dashboard', tmpUserid ]);
	}

}
