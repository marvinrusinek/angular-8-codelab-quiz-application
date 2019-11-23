import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { QuizQuestion } from '../../model/QuizQuestion';


@Component({
  selector: 'app-question-container',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {
  @Output() question: QuizQuestion;
  @Output() totalQuestions: number;
  @Output() totalSelections = 0;
  @Output() correctAnswersCount = 0;
  @Output() percentage = 0;
  @Output() completionTime: number;

  questionID = 0;
  currentQuestion = 0;
  questionIndex: number;
  correctAnswer: boolean;
  progressValue = 0;
  timeLeft = 20;
  interval: any;
  elapsedTime: number;  // elapsed time per question in seconds
  elapsedTimes = [];    // store elapsed times for all questions in an array
  blueBorder = '2px solid #007aff';

  @Output() allQuestions: QuizQuestion[] = [
    {
      questionId: 1,
      question: 'What is the objective of dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Pass the service to the client.' },
        { optionValue: '2', optionText: 'Allow the client to find service.' },
        { optionValue: '3', optionText: 'Allow the client to build service.' },
        { optionValue: '4', optionText: 'Give the client part service.' }
      ],
      answer: '1',
      explanation: 'a service gets passed to the client during DI',
      selectedOption: ''
    },
    {
      questionId: 2,
      question: 'Which of the following benefit from dependency injection?',
      options: [
        { optionValue: '1', optionText: 'Programming' },
        { optionValue: '2', optionText: 'Testability' },
        { optionValue: '3', optionText: 'Software design' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'DI simplifies both programming and testing as well as being a popular design pattern',
      selectedOption: ''
    },
    {
      questionId: 3,
      question: 'Which of the following is the first step in setting up dependency injection?',
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
      questionId: 4,
      question: 'In which of the following does dependency injection occur?',
      options: [
        { optionValue: '1', optionText: '@Injectable()' },
        { optionValue: '2', optionText: 'constructor' },
        { optionValue: '3', optionText: 'function' },
        { optionValue: '4', optionText: 'NgModule' },
      ],
      answer: '2',
      explanation: 'object instantiations are taken care of by the constructor by Angular',
      selectedOption: ''
    },
    {
      questionId: 5,
      question: 'Which access modifier is typically used in DI to make a service accessible in a class?',
      options: [
        { optionValue: '1', optionText: 'public' },
        { optionValue: '2', optionText: 'protected' },
        { optionValue: '3', optionText: 'private' },
        { optionValue: '4', optionText: 'static' },
      ],
      answer: '3',
      explanation: 'the private keyword, when used within the constructor, tells Angular that the service is accessible',
      selectedOption: ''
    },
    {
      questionId: 6,
      question: 'How does Angular know that a service is available?',
      options: [
        { optionValue: '1', optionText: 'If listed in the constructor.' },
        { optionValue: '2', optionText: 'If listed in the providers section of NgModule.' },
        { optionValue: '3', optionText: 'If the service is declared as an interface.' },
        { optionValue: '4', optionText: 'If the service is lazy-loaded.' },
      ],
      answer: '2',
      explanation: 'Angular looks at the providers section of NgModule to locate services that are available',
      selectedOption: ''
    },
    {
      questionId: 7,
      question: 'How does Angular avoid conflicts caused by using hardcoded strings as tokens?',
      options: [
        { optionValue: '1', optionText: 'Use an InjectionToken class' },
        { optionValue: '2', optionText: 'Use @Inject()' },
        { optionValue: '3', optionText: 'Use useFactory' },
        { optionValue: '4', optionText: 'Use useValue' },
      ],
      answer: '1',
      explanation: 'an InjectionToken class is preferable to using strings',
      selectedOption: ''
    },
    {
      questionId: 8,
      question: 'Which is the preferred method for getting necessary data from a backend?',
      options: [
        { optionValue: '1', optionText: 'HttpClient' },
        { optionValue: '2', optionText: 'WebSocket' },
        { optionValue: '3', optionText: 'NgRx' },
        { optionValue: '4', optionText: 'JSON' }
      ],
      answer: '1',
      explanation: 'a server makes an HTTP request using the HttpClient service',
      selectedOption: ''
    },
    {
      questionId: 9,
      question: 'In which of the following can Angular use services?',
      options: [
        { optionValue: '1', optionText: 'Lazy-loaded modules' },
        { optionValue: '2', optionText: 'Eagerly loaded modules' },
        { optionValue: '3', optionText: 'Feature modules' },
        { optionValue: '4', optionText: 'All of the above.' },
      ],
      answer: '4',
      explanation: 'Angular can utilize services with any of these methods',
      selectedOption: ''
    },
    {
      questionId: 10,
      question: 'Which of the following is true concerning dependency injection?',
      options: [
        { optionValue: '1', optionText: 'It is a software design pattern.' },
        { optionValue: '2', optionText: 'Injectors form a hierarchy.' },
        { optionValue: '3', optionText: 'Providers register objects for future injection.' },
        { optionValue: '4', optionText: 'All of the above.' }
      ],
      answer: '4',
      explanation: 'all of these are correct statements about dependency injection',
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
    this.totalQuestions = this.allQuestions.length;
    this.progressValue = 100 * (this.currentQuestion + 1) / this.totalQuestions;
    this.countDown();
  }

  displayNextQuestion() {
    this.questionIndex = this.questionID++;     // increase the question index by 1 for next question
    document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex].question;
    document.getElementById('question').style.border = this.blueBorder;
  }

  displayPreviousQuestion() {
    this.questionIndex = this.questionID - 2;   // decrease the question index by 2 for previous question
    document.getElementById('question').innerHTML = this.allQuestions[this.questionIndex].question;
    document.getElementById('question').style.border = this.blueBorder;
  }

  navigateToNextQuestion(): void {
    this.currentQuestion++;

    if (this.isThereAnotherQuestion()) {
      this.router.navigate(['/question', this.getQuestionID() + 1]);  // navigates to the next question
      this.resetTimer();                                              // reset the timer to 20 seconds
      this.displayNextQuestion();                                     // displays the next question
    }
  }

  navigateToPreviousQuestion(): void {
    this.currentQuestion--;
    this.router.navigate(['/question', this.getQuestionID() - 1]);  // navigates to the previous question
    this.resetTimer();                                              // reset the timer to 20 seconds
    this.displayPreviousQuestion();                                 // display the previous question
    this.decreaseProgressValue();                                   // calculates and lowers the progress value
  }

  // increase the correct answer count when the correct answer is selected
  incrementCorrectAnswersCount() {
    if (this.question && this.question.selectedOption === this.question.answer) {
      this.correctAnswersCount++;
      this.correctAnswer = true;
    } else {
      this.correctAnswer = false;
    }
  }

  // increase the total selections count when an option is selected
  incrementSelectionCount() {
    this.totalSelections += 1;
  }

  // increase the progress value when the user presses the next button
  increaseProgressValue() {
    this.progressValue = 100 * (this.currentQuestion += 1) / this.totalQuestions;
  }

  // decrease the progress value when the user presses the previous button
  decreaseProgressValue() {
    this.progressValue = 100 * (this.currentQuestion -= 1) / this.totalQuestions;
  }

  // determine the percentage from amount of correct answers given and the total number of questions
  calculatePercentage() {
    this.percentage = 100 * (this.correctAnswersCount + 1) / this.totalQuestions;
  }

  /****************  public API  ***************/
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

  // countdown timer and associated methods
  private countDown() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
        if (this.question.selectedOption !== '') {
          this.incrementSelectionCount();           // record the amount of selections
        }

        this.checkIfValidAndCorrect();  // check whether the question is valid and is answered correctly

        /* if (this.getQuestionID() >= this.totalQuestions) {
          // stop navigating
          this.router.navigateByUrl('/results');
        } */

        this.calculatePercentage();
        this.calculateTotalElapsedTime(this.elapsedTimes);


        // check if the timer is expired
        if (this.timeLeft === 0 && this.question && this.currentQuestion < this.totalQuestions) {
          this.resetTimer();
          this.displayNextQuestion();
        }
      }
    }, 1000);
  }

  private resetTimer() {
    this.timeLeft = 20;
  }
  private stopTimer() {
    this.timeLeft = 0;
  }

  private quizDelay(milliseconds) {
    const start = new Date().getTime();
    let counter = 0;
    let end = 0;

    while (counter < milliseconds) {
      end = new Date().getTime();
      counter = end - start;
    }
  }

  private calculateTotalElapsedTime(elapsedTimes) {
    this.completionTime = elapsedTimes.reduce((acc, cur) => acc + cur, 0);
  }

  checkIfValidAndCorrect(): void {
    if (this.question && this.currentQuestion < this.totalQuestions &&
        this.question.selectedOption === this.question.answer) {
      this.incrementCorrectAnswersCount();
      this.elapsedTime = 20 - this.timeLeft;
      this.elapsedTimes.push(this.elapsedTime);
      this.stopTimer();
      this.quizDelay(3000);

      this.router.navigate(['/question', this.getQuestionID() + 1]);
      this.displayNextQuestion();
      this.increaseProgressValue();
      this.resetTimer();
    }
  }
}
