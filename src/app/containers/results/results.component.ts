import { Component, OnInit, Input } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'codelab-quiz-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() answer = '';
  @Input() question: QuizQuestion;
  @Input() allQuestions: QuizQuestion[];
  @Input() totalQuestions: number;
  @Input() correctAnswersCount: number;
  @Input() percentage: number;
  @Input() completionTime: number;
  // @Input() totalSelections: number;
  // @Input() totalQuestionsAttempted: number;

  elapsedMinutes: number;
  elapsedSeconds: number;

  qAnswerOptionText: string;
  qSelectedOptionOptionText: string;

  codelabUrl = 'https://www.codelab.fun';

  constructor() {}

  options = [];

  ngOnInit() {
    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;

    this.parseOptionText();
    this.checkBounds();
  }

  parseOptionText() {
    if (this.question !== null) {
      this.qAnswerOptionText = this.question.options[parseInt(this.question.answer, 10) - 1].optionText;
      this.qSelectedOptionOptionText = this.question.options[parseInt(this.question.selectedOption, 10) - 1].optionText;
      console.log(this.qAnswerOptionText);
      console.log(this.qSelectedOptionOptionText);
    }
  }

  checkBounds() {
    // make sure the percentage is within bounds
    if (this.percentage < 0) {
      this.percentage = 0;
    }
    if (this.percentage > 100) {
      this.percentage = 100;
    }

    // check if correct answer count is somehow greater than the total number of questions
    if (this.correctAnswersCount > this.totalQuestions) {
      this.correctAnswersCount = this.totalQuestions;
    }
  }
}
