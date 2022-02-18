import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { questionAnswers, Quiz, resObj } from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-new-quiz',
  templateUrl: './new-quiz.component.html',
  styleUrls: ['./new-quiz.component.css'],
})
export class NewQuizComponent implements OnInit {
  questionsAnswers: questionAnswers[] = [];

  constructor(private httpService: HttpService, private router: Router) {}

  ngOnInit(): void {
    this.addAnotherQuestion();
  }

  addQuiz(form: NgForm) {

    this.httpService.postQuiz(form.value.title,form.value.description).subscribe((res) => {
      let id = (res as resObj).id;
      this.questionsAnswers.forEach((qa) => {
        qa.question.quiz_id = id;
        this.httpService.postQuestion(qa.question).subscribe((res) => {
          id = (res as resObj).id;
          qa.answers.forEach((answer) => {
            answer.question_id = id;
            this.httpService.postAnswer(answer,qa.question.quiz_id).subscribe((res) => {
              this.router.navigate(['/quizes']);
            });
          });
        });
      });
    });
  }

  removeQuestion = (ind: number) => {
    this.questionsAnswers.splice(ind, 1);
  };

  addAnotherQuestion() {
    let qa: questionAnswers = {
      question: { id: -1, quiz_id: -1, content: '' },
      answers: [],
    };

    this.questionsAnswers.push(qa);
  }
}
