import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

	constructor(private _activeRoute: ActivatedRoute) { }

	/*
	 * @func On component initiaze
	 * @return void
	 * Subscribe router param to show active user on the page
	*/
	ngOnInit():void {

		this.routerSubs = this._activeRoute.params.subscribe(params => this.userId = params['id']);
	}

	/*
	 * @func On component destroy
	 * @return void
	 * Unsubscribe router param
	*/
	ngOnDestroy():void {
		this.routerSubs.unsubscribe();
	}

}
