import { Component } from '@angular/core';
import { FirabaseService } from './services/firabase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'trivia';

  constructor(
    private firabaseService: FirabaseService,
  ) {
    this.getData().then();
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
