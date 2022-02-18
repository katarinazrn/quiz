import { Component, Input, OnInit } from '@angular/core';
import { Answer } from 'src/app/models';

@Component({
  selector: 'app-new-answer',
  templateUrl: './new-answer.component.html',
  styleUrls: ['./new-answer.component.css'],
})
export class NewAnswerComponent implements OnInit {
  @Input() answer: Answer = {
    id: -1,
    content: '',
    image_url: '',
    question_id: -1,
    is_correct: 0,
    previewUrl: undefined
  };
  @Input() index: number = 0;
  @Input()
  questionIndex!: number;
  @Input() removeAnswer = (ind: number) => {};
  @Input() setCorrect = (ind: number) => {};

  constructor() {}

  ngOnInit(): void {}

  onFileSelected(event:Event){
    if(<HTMLInputElement>event.target){
      let files = (<HTMLInputElement>event.target).files;
      let file=files![0];
      this.answer.previewUrl=URL.createObjectURL(file);
      this.answer.file=file;
    }
  }
}
