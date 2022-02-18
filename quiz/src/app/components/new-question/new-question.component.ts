import { Component, OnInit, Input, SimpleChange } from '@angular/core';
import { questionAnswers } from 'src/app/models';

@Component({
  selector: 'app-new-question',
  templateUrl: './new-question.component.html',
  styleUrls: ['./new-question.component.css'],
})
export class NewQuestionComponent implements OnInit {
  @Input() questionAnswer: questionAnswers = {
    question: {
      id: -1,
      quiz_id: -1,
      content: '',
    },
    answers: [],
  };
  @Input() questionIndex: number=-1;
  @Input() removeQuestion = (ind: number) => {};

  constructor() {}

  ngOnInit(): void {
    this.addAnotherAnswer(1);
    this.addAnotherAnswer(0);
  }

  setCorrect=( ind:number)=>{
    this.questionAnswer.answers = this.questionAnswer.answers.map((a) => {
      a.is_correct = 0;
      return a;
    });
    this.questionAnswer.answers[ind].is_correct = 1;
  };


  removeAnswer = (ind: number) => {
    this.questionAnswer.answers.splice(ind, 1);
  };

  addAnotherAnswer(correct: number) {
    this.questionAnswer.answers.push({
      id: -1,
      content: '',
      image_url: '',
      question_id: -1,
      is_correct: correct,
    });
  }
}
