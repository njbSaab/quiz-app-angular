import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizSingleComponent } from './quiz-single/quiz-single.component';

@NgModule({
  declarations: [
    QuizSingleComponent // Объявляем компонент
  ],
  imports: [
    CommonModule // Импортируем CommonModule для структурных директив
  ],
  exports: [
    QuizSingleComponent // Экспортируем компонент, если потребуется
  ]
})
export class QuizSingleModule { }
