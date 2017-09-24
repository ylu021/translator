import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { async, fakeAsync, tick } from '@angular/core/testing';
import { HttpModule } from '@angular/http';
import { FormsModule }   from '@angular/forms';

import { FormComponent } from '../form.component';
import { PhraseService } from '../phrase.service';
import { Phrase } from '../phrase';

describe('FormComponent', () => {
  let comp: FormComponent;
  let fixture: ComponentFixture<FormComponent>;
  let de: DebugElement;
  let el: HTMLElement;
  let input: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [ PhraseService ],
      imports: [ HttpModule, FormsModule ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.phrase-form'));
    el = de.nativeElement;
    input = fixture.debugElement.query(By.css('.phrase-input'));
  })

  it('should render the form with an input and a button', () => {
    comp.phrase = {
      text: ''
    };
    fixture.detectChanges();
    expect(el.children.length).toBe(2);
    expect(el.children[0].getAttribute('placeholder')).toBe('please type a word to begin');
    expect(el.children[1].getAttribute('class')).toBe('phrase-btn');
  });

  it('should changes the ngmodel when component value changes', fakeAsync(() => {
    comp.phrase.text = 'mock';
    fixture.detectChanges();
    tick();
    fixture.detectChanges();
    expect(input.nativeElement.getAttribute('ng-reflect-model')).toBe('mock');
  }));
});
