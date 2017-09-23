import { ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ FormComponent ],
      providers: [ PhraseService ],
      imports: [ HttpModule, FormsModule ]
    });

    fixture = TestBed.createComponent(FormComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.phrase-form'));
    el = de.nativeElement;
  });

  it('should render the form with an input and a button', () => {
    comp.phrase = {
      text: ''
    };
    fixture.detectChanges();
    expect(el.children.length).toBe(2);
    expect(el.children[0].getAttribute('placeholder')).toBe('please type a word to begin');
    expect(el.children[1].getAttribute('class')).toBe('phrase-btn');
  });

  it('should changes the ngmodel when input changes', () => {
    let input = fixture.debugElement.query(By.css('.phrase-input'));
    input.nativeElement.value = 'mock';
    input.nativeElement.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(comp.phrase).toBe('mock');
    });
  });

  // it('should display error message when phrase is empty', () => {
  //   let button = fixture.debugElement.query(By.css('.phrase-btn'));
  //   button.nativeElement.dispatchEvent(new Event('input'));
  //   fixture.detectChanges();
  //   fixture.whenStable().then(() => {
  //     expect(comp.error.message.length).not.toEqual(0);
  //     expect(comp.error.message).toEqual('Phrase cannot be empty');
  //   });
  // });
});
