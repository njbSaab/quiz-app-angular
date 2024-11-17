import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizListComponent } from './quiz-list/quiz-list.component';

@NgModule({
  declarations: [
    QuizListComponent, // Регистрация компонента
  ],
  imports: [
    CommonModule, // Общие модули Angular
  ],
  exports: [
    QuizListComponent, // Экспорт компонента, если потребуется
  ],
})
export class QuizListModule {}
