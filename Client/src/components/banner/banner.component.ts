import { Component } from '@angular/core';
import {NgClass, NgForOf} from '@angular/common';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.css'
})
export class BannerComponent {
  banners: string[] = [
    '/banner1.jpg',
    '/banner2.jpg',
    '/banner3.jpg'
  ]
  activeBanner: number = 0;
  private intervalId: any;

  constructor() {
    this.startAutoSlide();
  }

  startAutoSlide() {
    this.intervalId = setInterval(() => {
      this.activeBanner = (this.activeBanner + 1) % this.banners.length;
    }, 5000);
  }

  selectBanner(index: number): void {
    this.activeBanner = index;
    clearInterval(this.intervalId);
    this.startAutoSlide();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }
}
