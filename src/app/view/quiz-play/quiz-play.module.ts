import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizPlayComponent } from './quiz-play/quiz-play.component';
import { SharedModule } from '../../shared/shared.module';

const routes: Routes = [
  { path: '', component: QuizPlayComponent },
];

@NgModule({
  declarations: [QuizPlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule // Импорт SharedModule вместо ChangeBackgroundDirective

  ],
  exports: [RouterModule, QuizPlayComponent],
})
export class QuizPlayModule {}
