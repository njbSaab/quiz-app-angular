import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list/quiz-list.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [
    QuizListComponent, // Регистрация компонента
  ],
  imports: [
    CommonModule,
    RouterLink
  ],
  exports: [
    QuizListComponent, // Экспорт компонента, если потребуется
  ],
})
export class QuizListModule {}
