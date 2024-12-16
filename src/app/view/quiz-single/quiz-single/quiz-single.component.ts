import {
  Component,
  HostListener,
  OnInit,
} from '@angular/core';
import {
  trigger,
  transition,
  style,
  animate,
  query,
  stagger,
} from '@angular/animations';
import { Quiz } from '../../../core/interfaces/quiz.interface';
import { ActivatedRoute } from '@angular/router';
import { QuizService } from '../../../core/services/quiz.service';

@Component({
  selector: 'app-quiz-single',
  templateUrl: './quiz-single.component.html',
  styleUrls: ['./quiz-single.component.scss'],
  animations: [
    trigger('blurIn', [
      transition(':enter', [
        query(
          '.rounded-box',
          [
            style({ opacity: 0, filter: 'blur(10px)' }),
            stagger(150, [
              animate(
                '700ms ease-in-out',
                style({ opacity: 1, filter: 'blur(0px)' })
              ),
            ]),
          ],
          { optional: true }
        ),
      ]),
    ]),
  ]
})
export class QuizSingleComponent implements OnInit {
  quiz: Quiz | null = null;

  constructor(
    private route: ActivatedRoute,
    private quizService: QuizService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id'); // Получаем ID из маршрута
    if (id) {
      this.loadQuiz(+id); // Загружаем данные викторины
    }
  }

  loadQuiz(id: number): void {
    this.quizService.getQuizzes().subscribe(
      (quizzes: Quiz[]) => {
        this.quiz = quizzes.find((quiz) => quiz.id === id) || null; // Ищем викторину по ID
      },
      (error) => {
        console.error('Ошибка загрузки данных викторины:', error);
      }
    );
  }

  isArrow: boolean = false;

  arrowShow(): void {
    this.isArrow = true;
  }

  arrowHide(): void {
    this.isArrow = false;
  }
}
