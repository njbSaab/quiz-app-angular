import { Injectable } from '@angular/core';
import { map, Observable, of } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interface';
import { quizzes } from '../../../assets/quiz-data.js';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  getQuizzes(): Observable<Quiz[]> {
    return of(quizzes).pipe(
      map((quizzes) =>
        quizzes.map((quiz) => ({
          ...quiz,
          questions: quiz.questions.map((question) => ({
            ...question,
            // Убедимся, что `isCorrect` остается как 0 | 1
            answers: question.answers.map((answer) => ({
              ...answer,
              isCorrect: answer.isCorrect, // Оставляем значение 0 | 1 без изменений
            })),
          })),
        }))
      )
    );
  }

  getQuizById(id: number): Observable<Quiz | undefined> {
    return this.getQuizzes().pipe(
      map((quizzes) => quizzes.find((quiz) => quiz.id === id))
    );
  }
}
