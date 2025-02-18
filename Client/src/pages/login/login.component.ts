import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {Router} from '@angular/router';

const apiUrl: string = 'http://localhost:3000';

interface apiData {
  message: string;
  error?: string;
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  errorLogin: string = '';
  errorRegister: string = '';
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });

    this.registerForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      firstPassword: ['', [Validators.required, Validators.minLength(8)]],
      secondPassword: ['', [Validators.required, Validators.minLength(8)]],
      email: ['', [Validators.required, Validators.email]],
      acceptTerms: [false, [Validators.requiredTrue]]
    });
  }

  login() {
      if (!this.loginForm.controls['username'].value && !this.loginForm.controls['password'].value) {
        this.errorLogin = 'Wypełnij wszystkie pola';
        return;
      }

      if (this.loginForm.controls['username'].errors) {
        this.errorLogin = 'Nazwa użytkownika musi mieć co najmniej 3 znaki';
        return;
      }

      if (this.loginForm.controls['password'].errors) {
        this.errorLogin = 'Hasło musi mieć co najmniej 8 znaków';
        return;
      }

    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      if (!username || !password) {
        this.errorLogin = 'Wypełnij wszystkie pola';
        return;
      }
      const loginUser = {username, password};
      this.http.post<apiData>(`${apiUrl}/login`, loginUser).subscribe((response) => {
        if (response.error) {
          this.errorLogin = response.error;
        } else {
          this.router.navigate(['']);
        }
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const {username, firstPassword, secondPassword, email, acceptTerms} = this.registerForm.value;
      if (!(username && firstPassword && secondPassword && email && acceptTerms)) {
        this.errorRegister = 'Wypełnij wszystkie pola';
        return;
      }
      if (firstPassword !== secondPassword) {
        this.errorRegister = 'Hasła nie są takie same';
        return;
      }
      const registerUser = {username, password: firstPassword, email};
      this.http.post<apiData>(`${apiUrl}/register`, registerUser).subscribe((response) => {
        if (response.error) {
          this.errorRegister = response.error;
        } else {
          this.router.navigate(['']);
        }
      });
    }
  }
}
