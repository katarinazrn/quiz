import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment as env } from 'src/environments/environment';

import { Answer, Question, Quiz } from '../models';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  constructor(private http: HttpClient) {}

  postQuiz(title: string, description: string) {
    return this.http.post(env.baseUrl + '/quizes', {
      title: title,
      description: description,
    });
  }

  postQuestion(question: Question) {
    return this.http.post(env.baseUrl + '/questions', {
      content: question.content,
      quiz_id: question.quiz_id,
    });
  }
  /*
  postAnswer(answer: Answer) {
    return this.http.post(env.baseUrl + '/answers', {
      content: answer.content,
      image_ur: answer.image_url,
      is_correct: answer.is_correct,
      question_id: answer.question_id,
    });
  }
*/
  postAnswer(answer: Answer, quizId: number) {
    let form: FormData = new FormData();

    form.append('content', answer.content);
    form.append('image_url', answer.image_url);
    form.append('is_correct', answer.is_correct + '');
    form.append('question_id', answer.question_id + '');
    form.append('quiz_id', quizId + '');
    form.append('file', answer.file!);
    form.append('filename', answer.file?.name!);

    return this.http.post(env.baseUrl + '/answers', form);
  }

  getQuizes() {
    return this.http.get(env.baseUrl + '/quizes', {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  getQuiz(id: number) {
    return this.http.get(env.baseUrl + '/quizes/' + id, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  getQuestions(quizId: number) {
    let url = env.baseUrl + '/quizes/' + quizId + '/questions';
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }

  getAnswers(quizId: number, questionId: number) {
    let url =
      env.baseUrl +
      '/quizes/' +
      quizId +
      '/questions/' +
      questionId +
      '/answers';
    return this.http.get(url, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
    });
  }
}
