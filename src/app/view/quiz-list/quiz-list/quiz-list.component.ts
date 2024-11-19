import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../../core/services/quiz.service';
import { Quiz } from '../../../core/interfaces/quiz.interface';

@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss'],
})
export class QuizListComponent implements OnInit {
  quizzes: Quiz[] = []; // Указываем тип для массива викторин

  constructor(private quizService: QuizService) {}

  ngOnInit(): void {
    this.loadQuizzes();
  }

  loadQuizzes(): void {
    this.quizService.getQuizzes().subscribe(
      (data: Quiz[]) => {
        console.log('Полученные данные:', data);
        this.quizzes = data; // Прямое присвоение
      },
      (error) => {
        console.error('Ошибка загрузки данных:', error);
        // alert('Не удалось загрузить викторины.');
      }
    );
  }
}
