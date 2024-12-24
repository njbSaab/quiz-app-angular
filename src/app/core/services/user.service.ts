import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private db;

  constructor() {
    const app = initializeApp(environment.firebase);
    this.db = getFirestore(app);
  }

  // Добавление данных пользователя
  async addUser(user: any): Promise<void> {
    try {
      const docRef = await addDoc(collection(this.db, 'users'), user);
      console.log('User added with ID:', docRef.id);
    } catch (e) {
      console.error('Error adding user:', e);
    }
  }
}
