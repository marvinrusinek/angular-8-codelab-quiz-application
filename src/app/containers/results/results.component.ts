import { Component, OnInit, Input } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() allQuestions: QuizQuestion;
  @Input() totalQuestions: number;
  @Input() totalQuestionsAttempted: number;
  @Input() correctAnswersCount: number;
  @Input() percentage: number;
  @Input() completionTime: number;
  @Input() totalSelections: number;

  elapsedMinutes: number;
  elapsedSeconds: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  NOT_BAD = '../../../assets/images/not-bad.jpg';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';
  codelabUrl = 'https://www.codelab.fun';

  constructor() {}

  ngOnInit() {
    if (this.percentage < 0) {
      this.percentage = 0;
    }
    if (this.percentage > 100) {
      this.percentage = 100;
    }

    this.elapsedMinutes = Math.floor(this.completionTime / 60);
    this.elapsedSeconds = this.completionTime % 60;
  }
}
