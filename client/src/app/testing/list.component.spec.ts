import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { HttpModule } from '@angular/http';
import { ListComponent } from '../list.component';
import { PhraseService } from '../phrase.service';
import { Phrase } from '../phrase';

describe('ListComponent', () => {
  let comp: ListComponent;
  let fixture: ComponentFixture<ListComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let columnTitles: 'Phrase Language English Translation';
  let mockPhrases: Phrase[] = [
    { text: 'Bon jour', language: 'fr', translation: 'Hello' } as Phrase,
    { text: 'Au revoir', language: 'fr', translation: 'Good bye' } as Phrase
  ];
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ ListComponent ],
      providers: [ PhraseService ],
      imports: [HttpModule]
    });

    fixture = TestBed.createComponent(ListComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.list'));
    el = de.nativeElement;
  });

  it('should display the list with title columns', () => {
    comp.phrases = mockPhrases;
    fixture.detectChanges();
    expect(el.children[0].textContent).toContain('Phrase');
    expect(el.children[0].textContent).toContain('Language');
    expect(el.children[0].textContent).toContain('English Translation');
  });

  it('should display the correct number of items', () => {
    comp.phrases = mockPhrases;
    fixture.detectChanges();

    let content = fixture.debugElement.queryAll(By.css('.content'));
    expect(content.length).toEqual(2);
  });

  it('should display the list if there is at least one element', () => {
    comp.phrases = mockPhrases;
    fixture.detectChanges();

    let texts = fixture.debugElement.queryAll(By.css('.phrase-text'));
    expect(texts[0].nativeElement.textContent).toEqual('Bon jour');
    expect(texts[1].nativeElement.textContent).toEqual('Au revoir');

    let languages = fixture.debugElement.queryAll(By.css('.phrase-language'));
    expect(languages[0].nativeElement.textContent.trim()).toEqual('fr');
    expect(languages[1].nativeElement.textContent.trim()).toEqual('fr');

    let translation = fixture.debugElement.queryAll(By.css('.phrase-translation'));
    expect(translation[0].nativeElement.textContent.trim()).toEqual('Hello');
    expect(translation[1].nativeElement.textContent.trim()).toEqual('Good bye');
  });

  it('should display error message if there is one', () => {
    comp.error.message = 'error';
    fixture.detectChanges();

    let error = fixture.debugElement.query(By.css('.phrase-error'));
    expect(error.nativeElement.textContent.trim()).toBe('error');
  });

  it('should have no error div if there is no error', () => {
    comp.error.message = '';
    fixture.detectChanges();

    let error = fixture.debugElement.query(By.css('.phrase-error'));
    expect(error).toBe(null);
  });
});
