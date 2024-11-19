import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz, Question } from '../../../core/interfaces/quiz.interface';
import { QuizPlayService } from '../../../core/services/quiz-play.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss'],
})
export class QuizPlayComponent implements OnInit {
  quiz: Quiz | undefined; // Текущая викторина
  questions: Question[] = []; // Список вопросов
  currentQuestionIndex: number = 0; // Индекс текущего вопроса
  correctAnswersCount: number = 0; // Количество правильных ответов

  constructor(
    private quizPlayService: QuizPlayService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    const quizId = Number(this.route.snapshot.paramMap.get('id')); // Получаем ID викторины

    this.quizPlayService.getQuizById(quizId).subscribe((quiz) => {
      if (quiz) {
        this.quiz = quiz;
        this.questions = quiz.questions;

        // Восстановление прогресса из localStorage
        const storedIndex = localStorage.getItem('currentQuestionIndex');
        const storedCorrectCount = localStorage.getItem('correctAnswersCount');

        this.currentQuestionIndex = storedIndex ? +storedIndex : 0;
        this.correctAnswersCount = storedCorrectCount ? +storedCorrectCount : 0;
      }
    });
  }

  onAnswerSelect(isCorrect: number): void {
    // Проверяем правильность ответа
    if (isCorrect === 1) {
      this.correctAnswersCount++;
      localStorage.setItem('correctAnswersCount', this.correctAnswersCount.toString());
    }

    // Переход к следующему вопросу
    this.currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', this.currentQuestionIndex.toString());

    // Если вопросы закончились, сбрасываем прогресс
    if (this.currentQuestionIndex >= this.questions.length) {
      console.log('Викторина окончена');
    }
  }

  resetProgress(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('correctAnswersCount');
  }

}
