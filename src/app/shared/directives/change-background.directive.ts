import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appChangeBackground]',
})
export class ChangeBackgroundDirective {
  private colors: string[] = [
    'bg-gradient-primary-0',
    'bg-gradient-primary-90',
    'bg-gradient-primary-180',
    'bg-gradient-primary-240',
    'bg-gradient-primary-360',
  ];
  private currentIndex = -1;

  constructor(private el: ElementRef) {
    // Устанавливаем изначальный цвет
    this.el.nativeElement.style.background = '#282a36';
  }

  // Слушатель кликов
  @HostListener('click') onClick(): void {
    // Убираем текущий класс
    if (this.currentIndex >= 0) {
      this.el.nativeElement.classList.remove(this.colors[this.currentIndex]);
    }

    // Переход к следующему цвету
    this.currentIndex = (this.currentIndex + 1) % this.colors.length;

    // Добавляем новый класс
    this.el.nativeElement.classList.add(this.colors[this.currentIndex]);
  }
}
