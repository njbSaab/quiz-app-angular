import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';
import { quizzes } from '../../../assets/quiz-data';

@Injectable({
  providedIn: 'root',
})
export class QuizPlayService {
  constructor() {}

  getQuizById(quizId: number): Observable<Quiz | undefined> {
    const quiz = quizzes.find((q) => q.id === quizId); // Ищем викторину по ID
    return of(quiz); // Возвращаем как Observable
  }
}
