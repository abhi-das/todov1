import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';
import { UserLoginModel } from '../models/user.login.model';

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
			username: new FormControl('', Validators.required ),
			password: new FormControl('', Validators.required )
		});
	}

	/*
	 * @func onAuth()
	 * @return void
	 * Redirect to dashboard page with the userid as route param
	*/
	onAuth():void {
		
		// console.log(">isValid>>",this.loginForm.valid);
		let userLoginData = new UserLoginModel().deserialize(this.loginForm.value);

		// console.log("userLoginData > ",userLoginData);

		this._LoginSrv.userLogin(userLoginData).subscribe(res => {
			console.log('********** ',res);
		});

		// var tmpUserid = this.loginForm.value.username;
		
		// this._LoginSrv.setLoginId(tmpUserid);

		// this._route.navigate(['/dashboard', tmpUserid ]);
	}

}
