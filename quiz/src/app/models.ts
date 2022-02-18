export interface Quiz{
    id:number,
    title:string,
    created_at:Date,
    description:string
}

export interface Question{
    id:number,
    quiz_id:number,
    content:string
}

export interface Answer{
    id:number,
    question_id:number,
    content:string,
    image_url:string,
    is_correct:number,
    file?:File,
    previewUrl?:string
}

export interface questionAnswers{
    question:Question,
    answers:Answer[]
}

export interface resObj{
    id:number
}

export interface FullQuiz{
    quiz:Quiz,
    questionsAnswers:questionAnswers[],
}
