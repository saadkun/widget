import {
  Component,
  ContentChildren,
  QueryList,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';

enum SlideDirection {
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  NONE = 'NONE', // when there is no movement
}

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
    direction?: SlideDirection;
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
      title: 'New Charge',
      visible: false,
    },
  ];
  activeIndex = 0;

  slideDirection: SlideDirection = SlideDirection.NONE;

  setActive(index: number): void {
    this.activeIndex = index;
    this.updateVisibility();
  }

  ngAfterContentInit(): void {
    this.templates.forEach((template, index) => {
      if (this.slides[index]) {
        this.slides[index].template = template;
      }
    });
    this.updateVisibility();
  }

  nextSlide(): void {
    this.slideDirection = SlideDirection.RIGHT;
    this.activeIndex = (this.activeIndex + 1) % this.slides.length;
    this.updateVisibility();
  }

  previousSlide(): void {
    this.slideDirection = SlideDirection.LEFT;
    this.activeIndex =
      (this.activeIndex - 1 + this.slides.length) % this.slides.length;
    this.updateVisibility();
  }

  goToSlide(index: number): void {
    this.activeIndex = index;
    this.updateVisibility();
  }

  private updateVisibility(): void {
    this.slides.forEach((slide, index) => {
      slide.visible = index === this.activeIndex;
    });
    this.slides[this.activeIndex].direction = this.slideDirection;
  }
}
