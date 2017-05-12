import { Component } from '@angular/core';
import { LoopBackConfig } from './shared/sdk/index';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
  	LoopBackConfig.setBaseURL(environment.apiBaseURL);
	  LoopBackConfig.setApiVersion('api');
  }
}