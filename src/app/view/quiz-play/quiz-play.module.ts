import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { QuizPlayComponent } from './quiz-play/quiz-play.component';

const routes: Routes = [
  { path: '', component: QuizPlayComponent },
];

@NgModule({
  declarations: [QuizPlayComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule, QuizPlayComponent],
})
export class QuizPlayModule {}
