import { Component, OnInit, Input } from '@angular/core';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() allQuestions: QuizQuestion[];
  @Input() numberOfQuestions: number;
  @Input() correctAnswerCount: number;
  @Input() progressValue: number;
  @Input() numberOfQuestionsAnswered: number;
  percentage: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';

  codelabUrl = 'https://www.codelab.fun';

  constructor() { }

  ngOnInit() {
    this.percentage = 100 * (this.correctAnswerCount / this.numberOfQuestions);
  }
}
