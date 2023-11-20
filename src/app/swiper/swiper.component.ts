import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-swiper',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './swiper.component.html',
  styleUrl: './swiper.component.scss',
})
export class SwiperComponent {
  @ContentChildren(TemplateRef) templates!: QueryList<TemplateRef<any>>;
  slides: Array<{
    title: string;
    template?: TemplateRef<any>;
    visible: boolean;
  }> = [
    {
      title: 'Accelerated Charge',
      visible: true,
    },
    {
      title: 'Charge Done',
      visible: false,
    },
    {
      title: 'New Chage',
      visible: false,
    }
  ];
  activeIndex = 0;

  ngAfterContentInit(): void {
    this.templates.forEach((template, index) => {
      if (this.slides[index]) {
        this.slides[index].template = template;
      }
    });
    this.updateVisibility();
  }

  toggleVisibility(index: number): void {
    this.slides.forEach((slide, i) => {
      slide.visible = i === index ? !slide.visible : false;
    });
  }

  nextSlide(): void {
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    this.updateVisibility();
  }

  previousSlide(): void {
    this.activeIndex =
      (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    this.updateVisibility();
  }

  setActive(index: number): void {
    this.slides.forEach((slide, i) => {
      slide.visible = i === index;
    });
  }

  goToSlide(index: number): void {
    this.setActive(index);
  }

  private updateVisibility(): void {
    this.slides.forEach((slide, index) => {
      slide.visible = index === this.activeIndex;
    });
  }
}
