import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { QuizListModule } from './view/quiz-list/quiz-list.module';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { QuizSingleModule } from './view/quiz-single/quiz-single.module';
import { QuizPlayModule } from './view/quiz-play/quiz-play.module';
import { CommonModule } from '@angular/common';
import { QuizResultModule } from './view/quiz-result/quiz-result.module';
import { AboutModule } from './view/about/about.module';
import { ContactsComponent } from './view/contacts/contacts/contacts.component';
import { ContactsModule } from './view/contacts/contacts.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    QuizListModule,
    SharedModule,
    HttpClientModule,
    QuizSingleModule,
    QuizPlayModule,
    AboutModule,
    ContactsModule,
    CommonModule,
    QuizResultModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
