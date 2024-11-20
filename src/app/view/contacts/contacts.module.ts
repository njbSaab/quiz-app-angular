import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsComponent } from './contacts/contacts.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: ContactsComponent },
];


@NgModule({
  declarations: [
    ContactsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes), // Определяем маршруты прямо здесь

  ],
  exports: [ContactsComponent]
})
export class ContactsModule { }
