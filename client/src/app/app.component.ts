import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  template: `
    <h1>Hello {{name}}</h1>
    <nav>
      <a routerLink='/phrases'>Phrases</a>
      <a routerLink='/form'>Form</a>
    </nav>
    <router-outlet></router-outlet>
  `,
})
export class AppComponent  {
  name = 'Angular';
}
