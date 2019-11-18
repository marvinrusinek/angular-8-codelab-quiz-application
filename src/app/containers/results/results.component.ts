import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Output() allQuestions: QuizQuestion[];
  @Input() totalQuestions: number;
  @Input() totalQuestionsAttempted: number;
  @Input() correctAnswersCount: number;
  @Input() progressValue: number;
  @Input() percentage: number;
  @Input() completionTime: number;
  @Input() totalResponses: number;

  remainingMinutes: number;
  remainingSeconds: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';
  codelabUrl = 'https://www.codelab.fun';

  constructor() {
  }

  ngOnInit() {
    this.remainingMinutes = Math.floor(this.completionTime / 60);
    this.remainingSeconds = this.completionTime % 60;
  }

  @Output() messageToEmit = new EventEmitter<any>();

  sendMessageToParent(message) {
    this.messageToEmit.emit(message);
  }
}
