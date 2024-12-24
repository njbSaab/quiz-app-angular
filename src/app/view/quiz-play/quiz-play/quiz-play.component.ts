import { Component, OnInit } from '@angular/core';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';
import { ActivatedRoute } from '@angular/router';
import { Quiz, Question } from '../../../core/interfaces/quiz.interface';
import { QuizService } from '../../../core/services/quiz.service';
import { TimerService } from '../../../core/services/timer.service';

@Component({
  selector: 'app-quiz-play',
  templateUrl: './quiz-play.component.html',
  styleUrls: ['./quiz-play.component.scss'],
  animations: [
    // Анимация для вопроса
    trigger('questionFadeIn', [
      transition(':increment', [
        style({ opacity: 0, transform: 'translateY(-30px)' }),
        animate('1000ms ease-out', style({ opacity: 1, transform: 'translateY(0)' })),
      ]),
    ]),
    trigger('answersFadeIn', [
      // Анимация появления новых ответов
      transition(':increment', [
        query(
          '.quiz-play-answers-item',
          [
            style({ opacity: 0, transform: 'translateY(20px)' }), // Элементы начинают снизу
            stagger(100, [
              animate(
                '700ms ease-out',
                style({ opacity: 1, transform: 'translateY(0)' }) // Плавное появление и подъем
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
      // Анимация исчезновения старых ответов
      transition(':leave', [
        query(
          '.quiz-play-answers-item',
          [
            stagger(50, [
              animate(
                '500ms ease-in',
                style({ opacity: 0, transform: 'translateY(-20px)' }) // Элементы исчезают вверх
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ],
})
export class QuizPlayComponent implements OnInit {
  quiz: Quiz | undefined;
  questions: Question[] = [];
  currentQuestionIndex: number = 0;
  correctAnswersCount: number = 0;
  currentTime: number = 30;
  progress: number = 0;
  isAnswerVisible: boolean = true;

  constructor(
    private quizService: QuizService,
    private route: ActivatedRoute,
    private timerService: TimerService
  ) {}

  ngOnInit(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;

    this.timerService.currentTime$.subscribe((time) => {
      this.currentTime = time;
      if (time === 0) {
        this.goToNextQuestion();
      }
    });

    this.timerService.progress$.subscribe((progress) => {
      this.progress = progress;
    });

    const quizId = Number(this.route.snapshot.paramMap.get('id'));
    console.log('Quiz ID from route:', quizId);

    // Получаем викторину по ID из Firestore
    this.quizService.getQuizById(quizId).subscribe((quiz) => {
      if (quiz) {
        this.quiz = quiz;
        this.questions = quiz.questions;

        const storedIndex = localStorage.getItem('currentQuestionIndex');
        const storedCorrectCount = localStorage.getItem('correctAnswersCount');

        this.currentQuestionIndex = storedIndex ? +storedIndex : 0;
        this.correctAnswersCount = storedCorrectCount ? +storedCorrectCount : 0;

        this.timerService.startTimer();
      } else {
        // Если викторина не найдена
        console.error('Quiz not found!');
      }
    });
  }

  onAnswerSelect(isCorrect: number): void {
    console.log('Selected answer isCorrect value:', isCorrect);

    if (isCorrect) {
      this.correctAnswersCount++;
      console.log('Correct answers count:', this.correctAnswersCount);

      localStorage.setItem('correctAnswersCount', this.correctAnswersCount.toString());
    }

    this.isAnswerVisible = false;

    setTimeout(() => {
      this.goToNextQuestion();
      this.isAnswerVisible = true;
    }, 500);
  }

  goToNextQuestion(): void {
    this.currentQuestionIndex++;
    localStorage.setItem('currentQuestionIndex', this.currentQuestionIndex.toString());

    if (this.currentQuestionIndex >= this.questions.length) {
      this.timerService.stopTimer();
      this.currentTime = 0;
      this.progress = 100;
    } else {
      this.timerService.startTimer();
    }
  }

  resetProgress(): void {
    this.currentQuestionIndex = 0;
    this.correctAnswersCount = 0;
    localStorage.removeItem('currentQuestionIndex');
    localStorage.removeItem('correctAnswersCount');
  }
}
