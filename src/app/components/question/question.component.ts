import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  @Input() formGroup: FormGroup;

  @Input() question: QuizQuestion;
  @Input() numberOfQuestions: number;
  @Input() allQuestions: QuizQuestion[];
  @Output() answer = new EventEmitter<string>();
  option = '';
  @Output() selectedOption = '';
  correctAnswerCount = 0;

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

  incrementScore() {
    if (this.question.selectedOption === this.question.answer) {
      this.correctAnswerCount++;
    }
  }

  displayExplanation() {
    document.getElementById('question').innerHTML = 'Option ' + this.question.answer + ' was correct because ' + this.question.explanation + '.';
    document.getElementById('question').style.border = this.grayBorder;
  }

  isCorrect(option: string): boolean {
    return option === this.question.answer && this.question.selectedOption === option;
  }

  isIncorrect(option: string): boolean {
    return option !== this.question.answer && this.question.selectedOption === option;
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }
}
