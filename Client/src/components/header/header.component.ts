import { Component } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {RouterLink, RouterLinkActive} from '@angular/router';
import {HttpClient} from '@angular/common/http';

const apiUrl: string = 'http://localhost:3000';
interface User {
  id: number;
  username: string;
  email: string;
  error?: string;
}

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterLink, RouterLinkActive, NgOptimizedImage],
  templateUrl: './header.component.html',
  standalone: true,
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  username: string = '';
  cookie: string = '';

  navLinks = [
    {path: '', label: 'Główna' },
    {path: '/kolejki', label: 'Kolejki'}
  ];

  constructor(private http: HttpClient) {
    this.http.get<any>(`${apiUrl}/me`, {withCredentials: true}).subscribe(res => {
      console.log(res)
      if(res) {
        this.username = res.username;
      }
    });

  }
}
