import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { environment } from '../../../environments/environment';
import { Quiz } from '../interfaces/quiz.interface';
import { Observable, from } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private db;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Получение всех квизов
  getQuizzes(): Observable<Quiz[]> {
    const quizzesCollection = collection(this.db, 'quizzes');
    return from(getDocs(quizzesCollection)).pipe(
      map((snapshot) =>
        snapshot.docs.map((doc) => {
          const data = doc.data(); // Считываем данные как объект
          return {
            id: data['id'],
            title: data['title'],
            description: data['description'],
            description_long: data['description_long'],
            time: data['time'],
            rate: data['rate'],
            img: data['img'],
            questions: data['questions'],
          } as Quiz;
        })
      )
    );
  }

  // Получение квиза по ID
  getQuizById(id: number): Observable<Quiz | undefined> {
    const quizzesCollection = collection(this.db, 'quizzes');
    return from(getDocs(quizzesCollection)).pipe(
      map((snapshot) => {
        const quizDoc = snapshot.docs.find((doc) => doc.data()['id'] == id); // Используем "==" для приведения типов
        if (!quizDoc) {
          console.warn(`Quiz with ID ${id} not found.`);
          return undefined;
        }

        const data = quizDoc.data();
        console.log('Found Quiz:', data);

        return {
          id: data['id'],
          title: data['title'],
          description: data['description'],
          description_long: data['description_long'],
          time: data['time'],
          rate: data['rate'],
          img: data['img'],
          questions: data['questions'],
        } as Quiz;
      })
    );
  }
}
