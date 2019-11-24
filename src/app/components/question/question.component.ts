import { Component, OnInit, OnChanges, SimpleChanges, Input, Output, EventEmitter } from '@angular/core';
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
    // mark the correct answer regardless of which option is selected once answered
    return this.question.selectedOption && option === this.question.answer;
  }

  isIncorrect(option: string): boolean {
    // mark incorrect answer if selected
    return option === this.question.selectedOption && option !== this.question.answer;
  }

  onSubmit() {
    this.formGroup.reset({answer: null});
  }
}
