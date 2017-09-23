import { Component, Input } from '@angular/core';
import { Phrase } from './phrase';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'text-form',
  template: `
    <form class='phrase-form'>
      <input class='phrase-input' [(ngModel)]='phrase.text' type='text' name='phrase' placeholder='please type a word to begin'>
      <input class='phrase-btn' type='submit' value="{{ translating? 'Translating' : 'Translate'}}" (click)='submitText()'>
    </form>
    <div class='phrase-display' *ngIf='phrase.language && phrase.translation'>
      <p class='phrase-display-text'>{{phrase.text}}</p>
      <p>Detected language: {{phrase.language.toUpperCase()}}</p>
      <p>Translation: {{phrase.translation}}</p>
    </div>
    <div class="phrase-error-display" *ngIf="error.message">
      {{error.message}}
    </div>
  `,
  styleUrls: ['./form.component.css']
})

export class FormComponent {
  phrase: Phrase = {
    text: ''
  };
  error = {
    message: ''
  };
  translating = false;

  constructor(private phraseService: PhraseService) { }

  submitText(): void {
    this.phrase = {
      text: this.phrase.text
    };
    if(!this.phrase.text) {
      this.error.message = 'Phrase cannot be empty';
      return;
    }
    this.error.message = '';
    // perform service
    let text = this.phrase.text;
    // reset phrase
    this.phraseService.addPhrase(text)
      .then(phrase => {
        console.log(phrase, this.translating);
        this.phrase = phrase;
        this.translating = false;
      })
      .catch(error => {
        this.translating = false;
        this.error.message = error;
      });
  };
}
