import { Component, OnInit, OnChanges, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators, Form } from '@angular/forms';
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
  formGroup: FormGroup;
  answer: FormControl;

  @Input() question: QuizQuestion;
  @Input() numberOfQuestions: number;
  @Input() allQuestions: QuizQuestion[];
  // @Output() answer = new EventEmitter<number>();
  
  itemFrom: HTMLElement;
  itemTo: HTMLElement;
  
  option: number;
  @Output() selectedOption: number;

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

  radioChange(answer: number) {
    this.selectedOption = answer;
    // this.answer.emit(answer);
    this.displayExplanation();
  }

  displayExplanation() {
    var questionString = this.question.question;
    var explanationString = this.question.explanation;
    var explanationToDisplay = 
      "Option " + this.question.answer + " was correct because " + this.question.explanation + ".";
    document.getElementById("question").innerHTML = explanationToDisplay;
    document.getElementById("question").style.border = "2px solid #979797";
  }

  isCorrect(option: number): boolean {
    return option === this.question.answer && this.selectedOption === option;
  }

  isIncorrect(option: number): boolean {
    return option !== this.question.answer && this.selectedOption === option;
  }



  isThereAnotherQuestion(): boolean {
    return this.questionID < this.allQuestions.length;
  }

  getQuestionID() {
    return this.questionID;
  }

  onSubmit() {
    //if (formData.valid) {
    //  console.log("Form Submitted!");
      this.formGroup.reset({answer: null});
    //}
  }
}
