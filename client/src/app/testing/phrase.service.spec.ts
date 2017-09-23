import { TestBed, getTestBed, async, fakeAsync, tick, ComponentFixture } from '@angular/core/testing';
import {
    BaseRequestOptions,
    Http,
    Response,
    RequestMethod,
    ResponseOptions,
    XHRBackend
} from '@angular/http';
import {
    MockBackend,
    MockConnection
} from '@angular/http/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ListComponent } from '../list.component';
import { PhraseService } from '../phrase.service';
import { Phrase } from '../phrase';
import 'rxjs/add/operator/toPromise';

describe('Service: PhraseService', () => {
  let backend: MockBackend;
  let service: PhraseService;
  let mockPhrases: Phrase[] = [
    { text: 'Bon jour', language: 'fr', translation: 'Hello' } as Phrase,
    { text: 'Au revoir', language: 'fr', translation: 'Good bye' } as Phrase
  ];
  let console: Console;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        PhraseService,
        {
          deps: [
            MockBackend,
            BaseRequestOptions
          ],
          provide: Http,
          useFactory: (backend: XHRBackend, defaultOptions: BaseRequestOptions) => {
            return new Http(backend, defaultOptions);
          } // replace the backend with mock
        }
      ],
    });

    const testbed = getTestBed();
    backend = testbed.get(MockBackend);
    service = testbed.get(PhraseService);
  }));

  function setupMockResponse(backend: MockBackend, options: any) {
    backend.connections.subscribe((connection: MockConnection) => {
      // get phrases
      if (connection.request.url === 'api/phrases/') {
        const responseOptions = new ResponseOptions(options);
        connection.mockRespond(new Response(responseOptions));
      }
    });
  }

  describe('getPhrases', () => {
    it('should load the list', fakeAsync(() => {
      setupMockResponse(backend, {
        body: mockPhrases,
        status: 200
      });

      service.getPhrases().then((phrases: Phrase[]) => {
        expect(phrases.length).toBe(2);
        expect(phrases.keys.length).toBe(3);
        expect(phrases.keys).toContain('text');
        expect(phrases.keys).toContain('language');
        expect(phrases.keys).toContain('translation');
        expect(phrases[0].text).toBe('Bon jour');
        expect(phrases[1].text).toBe('Au revoir');
      });
    }));

    it('should log an error on catch', () => {
      setupMockResponse(backend, {
        body: {error: '404 Error retrieving list'},
        status: 404
      });

      service.getPhrases().then((err) => {
        expect(err.status).toBe(404);
      });
    });
  });

  describe('addPhrase', () => {
    it('existed, should just return the translation', () => {
      setupMockResponse(backend, {
        body: {text: 'Bon jour', language: 'fr', translation: 'Hello'},
        status: 200
      });

      service.addPhrase('Bon jour').then((phrase) => {
        expect(phrase.text).toBe('Bon jour');
        expect(phrase.language).toBe('fr');
        expect(phrase.translation).toBe('Hello');
        expect(phrase.status).toBe(200);
      });
    });
  });
});
