import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  @Input() questionId: number;
  @Input() numberOfQuestions: number;
  @Input() correctAnswerCount: number;
  
  constructor() { }

  ngOnInit() {
  }
}
