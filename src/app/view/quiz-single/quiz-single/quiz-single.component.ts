import { Component, HostListener } from '@angular/core';
import { Quiz } from '../../../core/interfaces/quiz.interface';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-quiz-single',
  templateUrl: './quiz-single.component.html',
  styleUrl: './quiz-single.component.scss'
})
export class QuizSingleComponent {
  quiz: Quiz | null = null;
  isArrow = true;
  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем ID из маршрута
    if (id) {
      this.loadQuiz(+id); // Загружаем данные викторины
    }
  }
  loadQuiz(id: number): void {
    this.quizService.getQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quiz = quizzes.find((quiz) => quiz.id === id) || null; // Ищем викторину по ID
      },
      (error) => {
        console.error('Ошибка загрузки данных викторины:', error);
      }
    );
  }
  arrowHide(): void {
    this.isArrow = false;
  }
}
