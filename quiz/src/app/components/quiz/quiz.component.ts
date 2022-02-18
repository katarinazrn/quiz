import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment as env } from 'src/environments/environment';
import {
  Answer,
  FullQuiz,
  Question,
  questionAnswers,
  Quiz,
} from 'src/app/models';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css'],
})
export class QuizComponent implements OnInit {
  score: number = 0;
  started: boolean = false;
  currentQuestion: number = 0;
  status: string = 'notAnswered';
  currentAnswerId: number = -1;
  disabled: boolean = false;
  ended: boolean = false;
  message:string='';
  baseUrl=env.baseUrl;

  quiz: FullQuiz = {
    quiz: { created_at: new Date(), id: -1, title: '', description:'' },
    questionsAnswers: [],
  };

  constructor(
    private route: ActivatedRoute,
    private httpService: HttpService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      let id = params['id'];

      this.httpService.getQuiz(id).subscribe((res) => {
        this.quiz.quiz = res as Quiz;

        this.httpService.getQuestions(id).subscribe((q) => {
          let qa: questionAnswers[] = [];
          (q as Question[]).map((question) =>
            qa.push({
              question: question,
              answers: [],
            })
          );
          this.quiz.questionsAnswers = qa;

          qa.forEach((questionAnswer) => {
            this.httpService
              .getAnswers(
                questionAnswer.question.quiz_id,
                questionAnswer.question.id
              )
              .subscribe((answers) => {
                questionAnswer.answers = answers as Answer[];
              });
          });
        });
      });
    });
  }

  startQuiz(){
    this.started=true;
    this.ended=false;
    this.currentQuestion=0;
    this.currentAnswerId=-1;
    this.score=0;
    this.status='notAnswered';
    this.message='';
  }

  onAnswer(answer: Answer) {
    if (this.disabled) return;

    this.disabled = true;
    this.currentAnswerId = answer.id;
    if (answer.is_correct == 1) {
      this.score++;
      this.status = 'correct';
    } else {
      this.status = 'incorrect';
    }

    setTimeout(() => {
      this.currentQuestion++;
      this.currentAnswerId = -1;
      this.status = 'notAnswered';
      this.disabled = false;
      if (this.currentQuestion == this.quiz.questionsAnswers.length) {
        this.started = false;
        this.ended = true;
        let perc:number=(this.score*100)/this.quiz.questionsAnswers.length;
        if(perc>95){
          this.message='Impressive!';
        }
        else if(perc>80){
          this.message='Great job!'
        }
      }
    }, 1300);
  }
}
