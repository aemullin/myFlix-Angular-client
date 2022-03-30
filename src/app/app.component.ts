/**
 * The AppComponent is the root component rendered in index.html and serves as the parent component to the entire application. 
 * @module AppComponent
 */

import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'myFlix-Angular-client';
}