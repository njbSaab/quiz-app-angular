import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class QuizService {
  private db;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Метод для добавления данных
  async addQuiz(quiz: any) {
    try {
      const docRef = await addDoc(collection(this.db, 'quizzes'), quiz);
      console.log('Quiz added with ID: ', docRef.id);
    } catch (e) {
      console.error('Error adding quiz: ', e);
    }
  }
}
