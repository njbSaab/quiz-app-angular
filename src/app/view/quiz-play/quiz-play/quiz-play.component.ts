import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Quiz, Question } from '../../../core/interfaces/quiz.interface';
import { QuizPlayService } from '../../../core/services/quiz-play.service';
import { TimerService } from '../../../core/services/timer.service';

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
  currentTime: number = 30;
  progress: number = 0;

  constructor(
    private quizPlayService: QuizPlayService,
    private route: ActivatedRoute,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;

    this.timerService.currentTime$.subscribe((time) => {
      this.currentTime = time;
      console.log('Текущее время:', time);

      // Обработка окончания времени
      if (time === 0) {
        console.log('Время истекло!');
        this.goToNextQuestion(); // Переход к следующему вопросу
      }
    });

    this.timerService.progress$.subscribe((progress) => {
      this.progress = progress;
    });

    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    this.quizPlayService.getQuizById(quizId).subscribe((quiz) => {
      if (quiz) {
        this.quiz = quiz;
        this.questions = quiz.questions;

        // Восстановление прогресса из localStorage
        const storedIndex = localStorage.getItem('currentQuestionIndex');
        const storedCorrectCount = localStorage.getItem('correctAnswersCount');

        this.currentQuestionIndex = storedIndex ? +storedIndex : 0;
        this.correctAnswersCount = storedCorrectCount ? +storedCorrectCount : 0;

        // Запуск таймера для первого вопроса
        this.timerService.startTimer();
      }
    });
  }

  onAnswerSelect(isCorrect: number): void {
    if (isCorrect === 1) {
      this.correctAnswersCount++;
      localStorage.setItem('correctAnswersCount', this.correctAnswersCount.toString());
    }

    // Переход к следующему вопросу
    this.goToNextQuestion();
  }

  goToNextQuestion(): void {
    this.currentQuestionIndex++;
    console.log(`Переход к вопросу: ${this.currentQuestionIndex}`);
    localStorage.setItem('currentQuestionIndex', this.currentQuestionIndex.toString());

    if (this.currentQuestionIndex >= this.questions.length) {
      console.log('Викторина завершена. Таймер остановлен.');
      this.timerService.stopTimer();
      this.currentTime = 0;
      this.progress = 100;
    } else {
      console.log('Таймер запущен для следующего вопроса.');
      this.timerService.startTimer();
    }
  }

  resetProgress(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('correctAnswersCount');
  }
  // Обработчик окончания вопроса или времени
  onTimeUp(): void {
    if (this.currentTime === 0) {
      console.log('Время истекло!'); // Действия при истечении времени
    }
  }
}
