import {Component, HostListener} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import {AuthService} from '../../services/auth.service';

interface User {
  id: number;
  username: string;
  email: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.component.html',
  standalone: true
})
export class HeaderComponent {
  visible: boolean = false;
  user: User | undefined;

  navLinks = [
    { path: '', label: 'Główna' },
    { path: '/kolejki', label: 'Kolejki' }
  ];

  changeVisibility() {
    this.visible = !this.visible;
  }
  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    if (!this.visible) return;
    if (!(event.target as HTMLElement).closest('#dropDownProfileMenu')) {
      this.visible = false;
    }
  }

  constructor(private authService: AuthService) {
    this.authService.me()
    this.user = this.authService.user;
  }

  logout() {
    this.authService.logout();
    this.user = this.authService.user
  }
}
