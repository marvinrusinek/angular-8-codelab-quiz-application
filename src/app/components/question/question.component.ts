import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  questionID = 1;
  quizForm: Form;
  @Input('formGroup') formGroup: FormGroup;

  @Input() question: QuizQuestion;
  @Input() numberOfQuestions: number;
  @Input() allQuestions: QuizQuestion[];
  @Output() answer = new EventEmitter<string>();
  option = '';
  @Output() selectedOption = '';

  constructor(private fb: FormBuilder, private router: Router) {}

  ngOnInit() {
    this.buildForm();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.question && changes.question.currentValue && !changes.question.firstChange) {
      this.formGroup.patchValue({answer: ''});
    }
    /* if (this.formGroup.invalid) {
      alert('Please select an option!');
    } else return; */
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

  displayExplanation() {
    const explanationToDisplay = 'Option ' + this.question.answer + ' was correct because ' 
                                           + this.question.explanation + '.';
    document.getElementById('question').innerHTML = explanationToDisplay;
    document.getElementById('question').style.border = '2px solid #979797';
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