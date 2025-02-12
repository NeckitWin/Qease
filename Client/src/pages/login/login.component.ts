import {Component} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FormBuilder, FormGroup, ReactiveFormsModule} from '@angular/forms';
import {NgIf} from '@angular/common';

const apiUrl: string = 'http://localhost:3000';

interface apiData {
  data: string;
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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.loginForm = this.fb.group({
      username: [''],
      password: ['']
    });

    this.registerForm = this.fb.group({
      username: [''],
      firstPassword: [''],
      secondPassword: [''],
      email: [''],
      acceptTerms: ['']
    });
  }

  login() {
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
        } else if (response.data) {
          this.errorLogin = 'Witaj ' + response.data;
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
        } else if (response.data) {
          this.errorRegister = 'Witaj ' + response.data;
        }
      });
    }
  }
}
