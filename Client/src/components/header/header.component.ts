import {Component, HostListener} from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import {Router} from '@angular/router';

const apiUrl: string = 'http://localhost:3000';
interface User {
  id: number;
  username: string;
  email: string;
}

interface apiData {
  user: User;
  error?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.component.html',
  standalone: true
})
export class HeaderComponent {
  button: string = '';
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

  constructor(private http: HttpClient, private router: Router) {
    this.http.get<apiData>(`${apiUrl}/me`, { withCredentials: true }).subscribe((res) => {
      if (res) {
        const {user} = res;
        this.button = user.username;
        this.user = user;
      }
    });
  }

  logout() {
    this.http.get<apiData>(`${apiUrl}/logout`, { withCredentials: true }).subscribe((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        this.button = '';
        this.user = undefined;
        this.router.navigate(['']);
      }
    });
  }
}
