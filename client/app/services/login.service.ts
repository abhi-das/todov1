import { Injectable } from '@angular/core';

@Injectable()

export class LoginService {

	userId: string;

	getLoginId():string {
		return this.userId;
	}

	setLoginId(userId): void {
		this.userId = userId;
	}
}