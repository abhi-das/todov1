/*
 * @type Service
 * @authod abhishek das
 * @email abhishekdass08@gmail.com
 * @publish 01-01-2018
*/

import { Injectable } from '@angular/core';

@Injectable()

export class LoginService {

	userId: string;

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