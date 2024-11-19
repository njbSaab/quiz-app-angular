// quiz.interface.ts
export interface Answer {
  text: string;
  isCorrect:any;
}

export interface Question {
  id: string;
  questionText: string;
  answers: Answer[];
  img?: string;
}

// quiz.interface.ts
export interface Quiz {
  id: number;
  title: string;
  description: string;
  description_long?: string;
  time: string;
  rate: string | number;
  img: string;
  questions: Question[];
}

