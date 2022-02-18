import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { HeaderComponent } from './components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewQuestionComponent } from './components/new-question/new-question.component';
import { NewAnswerComponent } from './components/new-answer/new-answer.component';
import { QuizesComponent } from './components/quizes/quizes.component';
import { QuizComponent } from './components/quiz/quiz.component';

@NgModule({
  declarations: [
    AppComponent,
    NewQuizComponent,
    HeaderComponent,
    NewQuestionComponent,
    NewAnswerComponent,
    QuizesComponent,
    QuizComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
