import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-quiz-result',
  templateUrl: './quiz-result.component.html',
  styleUrls: ['./quiz-result.component.scss']
})
export class QuizResultComponent implements OnInit {
  myForm!: FormGroup;
  isCodeVisible: boolean = false; // Отвечает за видимость поля "code"

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Инициализация формы
    this.myForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      code: [''], // Без валидатора, так как поле изначально скрыто
    });
  }

  // Обработка отправки формы
  sendForm(): void {
    if (this.myForm.get('name')?.valid && this.myForm.get('email')?.valid) {
      console.log('Form Submitted:', this.myForm.value);

      // Делаем поле "code" видимым и обязательным
      this.isCodeVisible = true;
      this.myForm.get('code')?.setValidators(Validators.required);
      this.myForm.get('code')?.updateValueAndValidity(); // Обновляем состояние поля
    }
  }

  // Вторичная отправка формы после появления поля code
  submitFinalForm(): void {
    if (this.myForm.valid) {
      console.log('Final Form Submitted:', this.myForm.value);
    }
  }
}
