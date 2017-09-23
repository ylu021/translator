import { Component, OnInit } from '@angular/core';
import { Phrase } from './phrase';
import { PhraseService } from './phrase.service';

@Component({
  selector: 'text-list',
  template: `
    <ul class='list'>
      <li class="row title" *ngIf="phrases">
        <div>Phrase</div>
        <div>Language</div>
        <div>English Translation</div>
      </li>
      <li class="row content" *ngFor="let phrase of phrases">
        <div class="phrase-text">{{phrase.text}}</div>
        <div class="phrase-language" *ngIf="phrase.language">
          {{phrase.language}}
        </div>
        <div class="phrase-translation" *ngIf="phrase.translation">
          {{phrase.translation}}
        </div>
      </li>
    </ul>
    <div class="phrase-error" *ngIf="error.message">
      {{error.message}}
    </div>
  `,
  styleUrls: ['./list.component.css']
})

export class ListComponent implements OnInit {
  phrases: Phrase[];
  error = {
    message: ''
  };

  constructor(private phraseService: PhraseService) { }

  ngOnInit(): void {
    // write a promise to fetch phrases
    this.phraseService.getPhrases()
      .then(phrases => {
        console.log(phrases);
        this.phrases = phrases;
      })
      .catch(error => this.error.message = error);
  }
}
