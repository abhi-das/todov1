/*
 * @type Service
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
*/
import { Injectable, OnInit,Inject, PLATFORM_ID, Injector } from '@angular/core';
import { Http, Response, HttpModule } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { UserLoginModel } from '../models/user.login.model';

@Injectable()

export class LoginService {

	userId: string;

	constructor(private _httpClient: HttpClient, @Inject(PLATFORM_ID) private platformId: Object,
			private injector: Injector) {}

	userLogin(userData: UserLoginModel): Observable<string> {

		let host = 'http://localhost:3000';
		let port = '3000';

		if(this.platformId == 'server') {		
			host = this.injector.get('serverUrl');
		}

		console.log(userData);

		return this._httpClient.post<any>("/user/auth", userData)
					.map(res => {
						console.log(res);
						return res;
					});
	}

	/*
	 * @func getLoginId()
	 * @return userId
	*/
	getLoginId():string {
		return this.userId;
	}

	/*
	 * @func setLoginId()
	 * @return void
	 * @param userId: set login user id
	*/
	setLoginId(userId): void {
		this.userId = userId;
	}


}