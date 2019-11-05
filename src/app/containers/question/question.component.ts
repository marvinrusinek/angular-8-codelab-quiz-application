import { Component, OnInit, Input, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';

import { QuizQuestion } from '../../model/QuizQuestion';

@Component({
  selector: 'app-question-container',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  questionID = 1;
  @Input() formGroup: FormGroup;
  @Output() question: QuizQuestion;
  @Output() numberOfQuestions: number;
  @Output() numberOfQuestionsAnswered = 0;
  @Output() correctAnswerCount = 0;
  @Output() progressValue = 0;

  timeLeft = 20;
  interval: any;
  questionIndex: number;
  quizOver = false;
  inProgress = true;
  blueBorder = '2px solid #007aff';
  nextBtnDisabled = true;

  validQuestion: string;
  validProgress: string;
  /* prevCondition: string;
  nextCondition: string;
  lastQuestion: string;
  timeExpiredCondition: string;
  timeExpiredNextCondition: string;
  timeExpiredLastCondition: string;
  validQuestion: string; */

  @Output() allQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      question: 'The objective of dependency injection is to...',
      options: [
        { optionValue: '1', optionText: 'pass the service to the client.' },
        { optionValue: '2', optionText: 'allow the client to find service.' },
        { optionValue: '3', optionText: 'allow the client to build service.' },
        { optionValue: '4', optionText: 'give the client part service.' }
      ],
      answer: '1',
      explanation: 'a service gets passed to the client during DI',
      selectedOption: ''
    },
    {
      questionId: 2,
      question: 'Which of the following is the first step in setting up Dependency Injection?',
      options: [
        { optionValue: '1', optionText: 'Require in the component.' },
        { optionValue: '2', optionText: 'Provide in the module.' },
        { optionValue: '3', optionText: 'Mark dependency as @Injectable().' }
      ],
      answer: '3',
      explanation: 'the first step is marking the class as @Injectable()',
      selectedOption: ''
    },
    {
      questionId: 3,
      question: 'Which of the following access modifiers make a service accessible in a class?',
      options: [
        { optionValue: '1', optionText: 'public' },
        { optionValue: '2', optionText: 'private' },
        { optionValue: '3', optionText: 'protected' },
        { optionValue: '4', optionText: 'static' },
      ],
      answer: '2',
      explanation: 'the private access modifier tells Angular that the service becomes accessible',
      selectedOption: ''
    },
    {
      questionId: 4,
      question: 'Which of the following benefit from Dependency Injection?',
      options: [
        { optionValue: '1', optionText: 'Programming' },
        { optionValue: '2', optionText: 'Testing' },
        { optionValue: '3', optionText: 'Both' },
        { optionValue: '4', optionText: 'None of the above.' },
      ],
      answer: '3',
      explanation: 'dependency injection simplifies both programming and testing',
      selectedOption: ''
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router) {
    this.route.paramMap.subscribe(params => {
      // get the question ID and store it.
      this.setQuestionID(+params.get('questionId'));
      this.question = this.getQuestion;
    });
  }

  ngOnInit() {
    this.question = this.getQuestion;
    this.numberOfQuestions = this.allQuestions.length;
    this.countDown();
    this.progressValue = 100 * (this.numberOfQuestionsAnswered += 1) / this.numberOfQuestions;

    this.validQuestion = 'question && question.questionId <= numberOfQuestions';
    this.validProgress = 'progressValue >= 0 && progressValue <= 100';
    /* this.validQuestion = 'question && question.questionId <= numberOfQuestions';
    this.prevCondition = 'question && question.questionId > 1';
    this.nextCondition = 'question && question.questionId !== numberOfQuestions';
    this.lastQuestion = 'question && question.questionId === numberOfQuestions';
    this.timeExpiredCondition = 'timeLeft === 0';
    this.timeExpiredNextCondition = this.timeExpiredCondition + ' && ' + this.nextCondition;
    this.timeExpiredLastCondition = this.timeExpiredCondition + ' && ' + this.lastQuestion; */

    /* if (!this.formGroup.valid) {
      this.nextBtnDisabled;
    } */
  }

  displayNextQuestion() {
    // increase the question index by 1 for next question
    this.questionIndex = this.questionID++;
    document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex].question;
    document.getElementById('question').style.border = this.blueBorder;
  }

  displayPreviousQuestion() {
    // decrease the question index by 2 for previous question
    this.questionIndex = this.questionID - 2;
    document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex].question;
    document.getElementById('question').style.border = this.blueBorder;
  }

  navigateToNextQuestion(): void {
    if (this.isThereAnotherQuestion()) {
      this.router.navigate(['/question', this.getQuestionID() + 1]);  // navigates to the next question
      this.resetTimer();                                              // reset the timer to 20 seconds
      this.displayNextQuestion();                                     // displays the next question
    }

    this.incrementCorrectAnswerCount();                               // increases the correct answer count by 1
    this.increaseProgressValue();                                     // calculates and increases the progress value
  }

  navigateToPreviousQuestion(): void {
    this.router.navigate(['/question', this.getQuestionID() - 1]);  // navigates to the previous question
    this.resetTimer();                                              // reset the timer to 20 seconds
    this.displayPreviousQuestion();                                 // display the previous question
    this.decreaseProgressValue();                                   // calculates and lowers the progress value
  }

  // navigates to the results component
  navigateToResults(): void {
    this.router.navigate(['/results']);
    this.quizOver = true;

    if (this.questionID > this.numberOfQuestions) {
      this.router.navigate(['/question', this.allQuestions.length]);  // send the user back to the last question
      this.quizOver = true;                                           // signify that the quiz is over
      this.inProgress = false;                                        // signify that the quiz is no longer in progress
    }
  }

  // increases the correct answer count when the correct answer is given
  incrementCorrectAnswerCount() {
    if (this.question.selectedOption === this.question.answer) {
      this.correctAnswerCount++;
    }
  }

  // increases the progress value when the user presses the next button
  increaseProgressValue() {
    this.progressValue = 100 * (this.numberOfQuestionsAnswered += 1) / this.numberOfQuestions;
  }

  // decreases the progress value when the user presses the previous button
  decreaseProgressValue() {
    this.progressValue = 100 * (this.numberOfQuestionsAnswered-- / this.numberOfQuestions);
  }

  /****************  public API functions ***************/
  getQuestionID() {
    return this.questionID;
  }

  setQuestionID(id: number) {
    return this.questionID = id;
  }

  isThereAnotherQuestion(): boolean {
    return this.questionID < this.allQuestions.length;
  }

  get getQuestion(): QuizQuestion {
    return this.allQuestions.filter(
      question => question.questionId === this.questionID
    )[0];
  }

  /* countdown timer functions */
  private countDown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      }
      if (this.timeLeft === 0) {
        if (this.questionID <= this.numberOfQuestions) {
          this.router.navigate(['/question', this.getQuestionID() + 1]);   // navigate to next question
          this.resetTimer();                                               // reset the timer to 20 seconds
          this.displayNextQuestion();                                      // display the next question
          this.incrementCorrectAnswerCount();                              // increase the correct answer count by 1
          this.increaseProgressValue();                                    // calculates the increased progress value
        }
        if (this.questionID > this.numberOfQuestions) {
          this.router.navigate(['/results']);                              // navigate to results
        }
      }
    }, 1000);
  }

  private resetTimer() {
    this.timeLeft = 20;
  }
}
