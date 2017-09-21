import { Component, OnInit } from '@angular/core';
import { Phrase } from './phrase';

export const mockPhrases: Phrase[] = [
  { text: 'Bon jour', language: 'fr', translation: 'Hello' },
  { text: 'Au revoir', language: 'fr', translation: 'Good bye' }
]

@Component({
  selector: 'text-list',
  template: `
    <ul>
      <li *ngFor="let phrase of phrases">
        <span>{{phrase.text}}</span>
        <div *ngIf="phrase.language && phrase.translation">
          {{phrase.language}}, {{phrase.translation}}
        </div>
      </li>
    </ul>
  `
})

export class ListComponent implements OnInit {
  // phrases: Phrase[];
  phrases = mockPhrases

  ngOnInit(): void {
    // write a promise to fetch phrases
  }
}
