import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizListComponent } from './view/quiz-list/quiz-list/quiz-list.component'; // Импорт компонента

const routes: Routes = [
  { path: '', component: QuizListComponent }, // Главная страница
  { path: '**', redirectTo: '' }, // Редирект для неизвестных маршрутов
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Настройка маршрутов
  exports: [RouterModule],
})
export class AppRoutingModule {}
