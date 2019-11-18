import { Component, Input } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-quiz-summary',
  templateUrl: './quizsummary.component.html',
  styleUrls: ['./quizsummary.component.scss']
})
export class QuizSummaryComponent {
  @Input() allQuestions: QuizQuestion[];

  constructor() {}

  receivedChildMessage: any;
  getMessage(message) {
    this.receivedChildMessage = message;
  }
}
