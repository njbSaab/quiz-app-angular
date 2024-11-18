export interface Answer {
  text: string;      // Текст ответа
  isCorrect: number; // Флаг правильности ответа (0 или 1)
}

export interface Question {
  id: string;         // Уникальный идентификатор вопроса
  img?: string;       // URL изображения (необязательно)
  questionText: string; // Текст вопроса
  answers: Answer[];  // Список ответов
}

export interface Quiz {
  id: number;          // Уникальный идентификатор викторины
  title: string;       // Название
  description: string; // Краткое описание
  description_long: string; // Полное описание
  time: string;        // Дата/время
  rate: string;        // Рейтинг
  img: string;         // URL изображения
  questions: Question[]; // Вопросы викторины
}
