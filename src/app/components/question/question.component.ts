import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  @Output() answer = new EventEmitter<string>();
  @Output() formGroup: FormGroup;
  @Input() question: QuizQuestion;
  @Input() allQuestions: QuizQuestion[];
  @Input() totalQuestions: number;
  option = '';
  selectedOption = '';
  grayBorder = '2px solid #979797';

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({answer: ''});
    }
  }

  private buildForm() {
    this.formGroup = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  radioChange(answer: string) {
    this.question.selectedOption = answer;
    this.answer.emit(answer);
    this.displayExplanation();
  }

  displayExplanation(): void {
    const explanation = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
    document.getElementById('question').innerHTML = explanation;
    document.getElementById('question').style.border = this.grayBorder;
  }

  isCorrect(option: string): boolean {
    return option === this.question.answer && this.question.selectedOption === option;
  }

  isIncorrect(option: string): boolean {
    return option !== this.question.answer && this.question.selectedOption === option;
  }

  // todo: get this working!!!
  checkAnswer() {
    let radioElem = document.getElementById('mat-radio-btn');
    if (this.question.selectedOption === this.question.answer) {
      radioElem.classList.add('is-correct');
    } else {
      radioElem.classList.add('is-incorrect');
      if (radioElem.innerHTML === this.question.answer) {
        radioElem.classList.add('is-correct');
      }
    }
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }
}
