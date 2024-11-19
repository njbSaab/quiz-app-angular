import { QuizResultModule } from './view/quiz-result/quiz-result.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'quizzes', pathMatch: 'full' }, // Редирект на список квизов
  {
    path: 'quizzes',
    loadChildren: () =>
      import('./view/quiz-list/quiz-list.module').then((m) => m.QuizListModule), // Ленивый загрузчик для модуля списка квизов
  },
  {
    path: 'quiz/:id',
    loadChildren: () =>
      import('./view/quiz-single/quiz-single.module').then((m) => m.QuizSingleModule), // Ленивый загрузчик для модуля одного квиза
  },
  {
    path: 'quiz/:id/play',
    loadChildren: () =>
      import('./view/quiz-play/quiz-play.module').then((m) => m.QuizPlayModule),
  },
  {
    path: 'quiz/:id/result',
    loadChildren: () =>
      import('./view/quiz-result/quiz-result.module').then((m) => m.QuizResultModule),
  },
  { path: '**', redirectTo: 'quizzes' }, // Переадресация на список квизов при неправильном пути
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Настройка маршрутов для основного приложения
  exports: [RouterModule], // Экспортируем RouterModule, чтобы он мог использоваться в AppModule
})
export class AppRoutingModule {}
