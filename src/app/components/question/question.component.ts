import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, Form } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit, OnChanges {
  questionID = 1;
  quizForm: Form;
  formGroup: FormGroup;

  @Input() question: QuizQuestion;
  @Input() numberOfQuestions: number;
  @Input() allQuestions: QuizQuestion[];
  @Output() answer = new EventEmitter<number>();
  
  itemFrom: HTMLElement;
  itemTo: HTMLElement;
  
  option: number;
  selectedOption: number;

  constructor(private fb: FormBuilder, private route: ActivatedRoute, private router: Router) {}

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

  radioChange(answer: number) {
    this.selectedOption = answer;
    this.answer.emit(answer);
  }

  /*initialState(): boolean {
    return this.selectedOption === '';
  }*/

  isCorrect(option: number): boolean {
    return option === this.question.answer && this.selectedOption === option;
  }

  isIncorrect(option: number): boolean {
    return option !== this.question.answer && this.selectedOption === option;
  }

  nextQuestion() {
    if (this.isThereAnotherQuestion()) {
      this.router.navigate(['/question', this.getQuestionID() + 1 ]);
    }
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID < this.allQuestions.length;
  }

  getQuestionID() {
    return this.questionID;
  }

  onSubmit(formData) {
    // this.formGroup.reset();
    console.log(formData);
  }
}
