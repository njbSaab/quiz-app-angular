import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../core/services/user.service';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss'],
})
export class QuizResultComponent implements OnInit {
  myForm!: FormGroup;
  isCodeVisible: boolean = false;

  // Результаты из локального хранилища
  correctAnswersCount: number = 0;
  currentQuestionIndex: number = 0;

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    // Инициализация формы
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      code: [''],
    });

    const correctAnswersCount = localStorage.getItem('correctAnswersCount');
    const currentQuestionIndex = localStorage.getItem('currentQuestionIndex');

    // Устанавливаем значения переменных, либо используем 0 по умолчанию
    this.correctAnswersCount = correctAnswersCount ? +correctAnswersCount : 0;
    this.currentQuestionIndex = currentQuestionIndex ? +currentQuestionIndex : 0;

  }

  sendForm(): void {
    if (this.myForm.get('name')?.valid && this.myForm.get('email')?.valid) {
      console.log('Form Submitted:', this.myForm.value);

      // Делаем поле "code" видимым
      this.isCodeVisible = true;
      this.myForm.get('code')?.setValidators(Validators.required);
      this.myForm.get('code')?.updateValueAndValidity();
    }
  }

  async submitFinalForm(): Promise<void> {
    if (this.myForm.valid) {
      const userData = {
        name: this.myForm.get('name')?.value,
        email: this.myForm.get('email')?.value,
        code: this.myForm.get('code')?.value,
        correctAnswers: this.correctAnswersCount,
        TotalAnswers: this.currentQuestionIndex,
      };

      try {
        await this.userService.addUser(userData);
        console.log('User data saved:', userData);
      } catch (error) {
        console.error('Error saving user data:', error);
      }
    }
  }
}
