import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

import { Phrase } from './phrase';

const mockPhrases: Phrase[] = [
  { text: 'Bon jour', language: 'fr', translation: 'Hello' },
  { text: 'Au revoir', language: 'fr', translation: 'Good bye' }
]

@Injectable()
export class PhraseService {
  private api = '/api/phrases/';

  constructor(private http: Http) { }

  addPhrase(text: String): Promise<Phrase> {
    let headers = new Headers();
    let data = { text }
    headers.append('Content-Type', 'application/json');
    return this.http.post(this.api, data, {
        headers: headers
      })
      .toPromise()
      .then(response => {
        console.log('response', response.json());
        return response.json() as Phrase;
      })
      .catch(this.handleTranslateError);
  }

  getPhrases(): Promise<Phrase[]> {
    return this.http.get(this.api)
      .toPromise()
      .then(response => {
        console.log('response', response.json());
        return response.json() as Phrase[];
      })
      .catch(this.handleError);
    // return Promise.resolve(mockPhrases);
  }

  private handleError(error: any): Promise<any> {
    // TODO: should handle this error
    console.error('Error retrieving list', error);
    return Promise.reject(`${error.status} Error retrieving list` || error);
  }

  private handleTranslateError(error: any): Promise<any> {
    // TODO: should handle this error
    console.error('Error connecting to translator', error);
    return Promise.reject(`${error.status} Error connecting to translator` || error);
  }
}
