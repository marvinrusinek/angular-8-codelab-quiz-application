import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  // @Input() questionId: number;
  @Input() numberOfQuestions: number;
  @Input() correctAnswerCount: number;

  ANGULAR_TROPHY = '../../../assets/images/ng-trophy.png';
  TRY_AGAIN = '../../../assets/images/try-again.png';

  constructor() { }

  ngOnInit() {
  }
}
