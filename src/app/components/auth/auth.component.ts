import { Component } from '@angular/core';

@Component({
  selector: 'app-auth',
  template: `
    <app-header></app-header>

    <router-outlet></router-outlet>
  `,
  styles: [`
    :host {
      display: block;
      height: 100%;
    }
  
  `]
})
export class AuthComponent {

}
