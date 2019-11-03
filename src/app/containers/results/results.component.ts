import { Component, OnInit, Input, Output } from '@angular/core';
import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input() allQuestions: QuizQuestion[];
  @Input() numberOfQuestions: number;
  @Input() numberOfQuestionsAnswered: number;
  @Input() correctAnswerCount: number;
  @Input() progressValue: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  TRY_AGAIN = '../../../assets/images/try-again.jpeg';

  constructor() { }

  ngOnInit() {
  }
}
