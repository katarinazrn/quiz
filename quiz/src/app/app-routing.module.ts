import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NewQuizComponent } from './components/new-quiz/new-quiz.component';
import { QuizComponent } from './components/quiz/quiz.component';
import { QuizesComponent } from './components/quizes/quizes.component';

const routes: Routes = [
  {
    path: 'quizes',
    component: QuizesComponent
  },
  {
    path: 'quizes/:id',
    component: QuizComponent,
  },
  {
    path: 'new-quiz',
    component: NewQuizComponent,
  },
  { path: '**', component: QuizesComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
