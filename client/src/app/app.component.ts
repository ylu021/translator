import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'my-app',
  template: `
    <h1>{{appname}}</h1>
    <nav>
      <a class="link" routerLink='/phrases' routerLinkActive="active-link">Phrases</a>
      <a class="link" routerLink='/form' routerLinkActive="active-link">Form</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  appname = 'Translator';
  selected = true;
}
