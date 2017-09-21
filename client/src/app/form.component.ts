import { Component, Input } from '@angular/core';
import { Phrase } from './phrase';

@Component({
  selector: 'text-form',
  template: `
    <form>
      <input [(ngModel)]="phrase.text" type="text" name="phrase" placeholder="please type a word to begin">
      <input type="submit" value="translate" (click)="submitText()">
    </form>
  `
})

export class FormComponent {
  phrase: Phrase = {
    text: ''
  };
  submitText(): void {
    // perform service
    let text = this.phrase.text;
    console.log(text);
  };
}
