import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms';
import { RouterModule }   from '@angular/router';
import { HttpModule, XSRFStrategy, CookieXSRFStrategy }    from '@angular/http';

import { AppComponent }  from './app.component';
import { FormComponent }  from './form.component';
import { ListComponent }  from './list.component';

import { PhraseService } from './phrase.service';


@NgModule({
  imports:      [
    BrowserModule,
    FormsModule,
    HttpModule,
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
  bootstrap:    [ AppComponent ],
  providers: [
    PhraseService,
    {
      provide: XSRFStrategy,
      useValue: new CookieXSRFStrategy('csrftoken', 'X-CSRFToken')
    }
  ]
})
export class AppModule { }
