import { Component } from '@angular/core';
import { FirabaseService } from './services/firabase.service';
import { IQuestion } from './interfaces/question.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  questions: IQuestion[] = [];
  correctAnswers = 0;
  questionIndex = 0;
  status: 'playing' |
          'loading' |
          'finished' |
          'waiting' = 'waiting';
  showOptionResult = false;


  get currentQuestion() {
    return this.questions[this.questionIndex];
  }

  constructor(
    private firabaseService: FirabaseService,
  ) {
  }

  async nextQuestion(answerIndex: number) {
    if ( answerIndex ===
      this.currentQuestion.correctAnswerIndex) {
      this.correctAnswers++;
    }
    this.showOptionResult = true;

    setTimeout(() => {

      if (this.questionIndex === this.questions.length - 1) {
        this.status = 'finished';
        this.questionIndex = 0;
        this.questions = [];
        this.showOptionResult = false;
        return;
      }

     // this.questionIndex = this.questionIndex + 1;
      this.questionIndex++;
      this.showOptionResult = false;

    }, 2000);

  }


  async start() {
    this.status = 'loading';
    this.correctAnswers = 0;
    this.questions = await
    this.firabaseService.shuffleQuestions(10);
    this.status = 'playing';
  }



  async import() {
    console.log("Importing data...");
    await this.firabaseService.importData();
    console.log("Data imported!");
  }

  async getData() {
    const questions = await this.firabaseService.getAllQuestions();
    console.log(questions);
  }

}
