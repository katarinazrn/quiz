import { Component, OnInit } from '@angular/core';
import { Answer, FullQuiz, Question, Quiz } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-quizes',
  templateUrl: './quizes.component.html',
  styleUrls: ['./quizes.component.css'],
})
export class QuizesComponent implements OnInit {
  quzies: FullQuiz[]=[];

  constructor(private httpService: HttpService) {}

  ngOnInit(): void {
    this.httpService.getQuizes().subscribe((res) => {
      let q: Quiz[] = res as Quiz[];
      q.forEach((quiz) => {
        this.quzies.push({
          quiz: quiz,
          questionsAnswers: [],
        });

        this.httpService.getQuestions(quiz.id).subscribe((res) => {
          let questions: Question[] = res as Question[];

          questions.forEach((question) => {
            this.quzies.map((qu) => {
              if (qu.quiz.id == quiz.id)
                qu.questionsAnswers.push({
                  question: question,
                  answers: [],
                });
              return qu;
            });

            this.httpService
              .getAnswers(question.quiz_id, question.id)
              .subscribe((res) => {
                let answers: Answer[] = res as Answer[];

                this.quzies.map((qu) => {
                  if (qu.quiz.id == question.quiz_id) {
                    qu.questionsAnswers.map((qa) => {
                      if (qa.question.id == question.id) {
                        qa.answers = answers;
                      }
                      return qa;
                    });
                  }
                  return qu;
                });
              });
          });
        });
      });
    });
  }
}
