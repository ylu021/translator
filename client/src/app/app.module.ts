import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';

import { AppComponent }  from './app.component';
import { FormComponent }  from './form.component';
import { ListComponent }  from './list.component';
// import { ListComponent }  from './list.component';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot([
      {
        path: 'phrases',
        component: ListComponent
      },
      {
        path: 'form',
        component: FormComponent
      },
      {
        path: '',
        redirectTo: '/phrases',
        pathMatch: 'full'
      },

    ])
  ],
  declarations: [
    AppComponent,
    FormComponent,
    ListComponent
  ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
