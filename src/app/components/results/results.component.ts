import { Component, OnInit, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() numberOfQuestions: number;
  @Input() correctAnswerCount: number;
  @Input() allQuestions: QuizQuestion[];
  @Input() progressValue: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  TRY_AGAIN = '../../../assets/images/try-again.png';

  constructor() { }

  ngOnInit() {
  }
}
