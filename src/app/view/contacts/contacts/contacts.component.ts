import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../core/services/quiz-questions-db.service';
import { quizzes } from '../../../../assets/quiz-data'; // Путь к вашему массиву данных

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class ContactsComponent implements OnInit {
  constructor(private quizService: QuizService) {}

  ngOnInit() {}

  // Метод для загрузки всех квизов
  async uploadQuizzes() {
    for (const quiz of quizzes) {
      await this.quizService.addQuiz(quiz);
    }
    console.log('All quizzes uploaded successfully');
  }
}
