import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Quiz } from '../interfaces/quiz.interace';
import { quizzes } from '../../../assets/quiz-data'; // Импорт данных

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  getQuizzes(): Observable<Quiz[]> {
    return of(quizzes); // Указываем тип возвращаемых данных
  }
}
