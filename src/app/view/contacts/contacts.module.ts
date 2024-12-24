import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactsComponent } from './contacts/contacts.component';
import { QuizService } from '../../core/services/quiz-questions-db.service';

const routes: Routes = [
  { path: '', component: ContactsComponent },
];

@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [QuizService], // Добавляем сервис в providers
  exports: [ContactsComponent]
})
export class ContactsModule {}
