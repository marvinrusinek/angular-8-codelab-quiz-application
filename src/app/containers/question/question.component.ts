import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question-container',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionID = 1;
  question: QuizQuestion;
  questions: QuizQuestion[] = [
    {
      questionId: 1,
      question: 'Which of the following is correct about TypeScript?',
      options: [
        { optionValue: 1, optionText: 'Angular is based on TypeScript.' },
        { optionValue: 2, optionText: 'This is a superset of JavaScript.' },
        { optionValue: 3, optionText: 'TypeScript is maintained by Microsoft.' },
        { optionValue: 4, optionText: 'All of the above.' }],
      answer: 4,
      explanation: 'all of these are true statements about TypeScript'
    }
  ];

  @Output() count: number;
  @Output() numberOfQuestions: number;
  currentIndex = 0;
  // currentQuestion = this.getQuestion[this.currentIndex];
  
  correctAnswerCount = 0;
  numberOfQuestionsAnswered = 0;  
  questionCount = 0;
  progressValue = 0;
  progressPercentage: number = 0;

  timeLeft = 20;
  interval: any;

  selectedOption: number;
  userAnswers = [];

  CONGRATULATIONS = '../../../assets/images/congratulations.jpg';
  TRY_AGAIN = '../../../assets/images/try-again.png';

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      // get the question ID and store it.
      this.setQuestionID(+params.get('questionId'));
      this.question = this.getQuestion;
      this.questionCount = this.numberOfQuestions;
      this.progressValue = (this.numberOfQuestionsAnswered / this.numberOfQuestions) * 100;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.numberOfQuestions = this.questions.length;
    this.countDown();
  }

  answer(value: string) {
    console.log(value);
    // may want to do something with the answer here
  }

  nextQuestion(): void {
    this.questionID++;
    // console.log(this.questionID);

    this.incrementQuestionsAnswered();

    if (this.question.answer === this.selectedOption) {
      this.incrementCorrectAnswerCount();
    }
    this.progressValue = (this.numberOfQuestionsAnswered / this.numberOfQuestions) * 100;
  
    if (this.isThereAnotherQuestion()) {
      this.router.navigate(['/question', this.getQuestionID() + 1 ]);
      this.timeLeft = 20;
    }

    // delete this.question.selectedOption
  }

  prevQuestion() {
    this.questionID--;
    this.router.navigate(['/question', this.getQuestionID() - 1 ]);
  }

  /* showResults() {
    this.router.navigate(['/results']);
  } */

  incrementCorrectAnswerCount(): number {
    // this.count.emit(this.correctAnswerCount);
    return this.correctAnswerCount++;
  }

  incrementQuestionsAnswered(): number {
    // this.numberOfQuestions.emit(this.numberOfQuestionsAnswered);
    return this.numberOfQuestionsAnswered++;
  }

  private countDown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
    }, 1000);
  }

  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID < this.questions.length;
  }

  get getQuestion(): QuizQuestion {
    return this.questions.filter(question => (question.questionId === this.questionID))[0];
  }
}
