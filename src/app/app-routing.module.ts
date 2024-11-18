import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './view/quiz-list/quiz-list/quiz-list.component'; // Импорт компонента
import { QuizSingleComponent } from './view/quiz-single/quiz-single/quiz-single.component';

const routes: Routes = [
  { path: '', component: QuizListComponent }, // Главная страница
  { path: 'quiz/:id', component: QuizSingleComponent }, // Страница викторины

  { path: '**', redirectTo: '' }, // Редирект для неизвестных маршрутов
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Настройка маршрутов
  exports: [RouterModule],
})
export class AppRoutingModule {}
