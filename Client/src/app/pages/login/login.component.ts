import {Component} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {NgIf} from '@angular/common';
import {AuthService} from '../../services/auth.service';

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

  constructor(private fb: FormBuilder, private authService: AuthService) {
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
    if (this.loginForm.valid) {
      const {username, password} = this.loginForm.value;
      this.authService.login(username, password);
      this.authService.error$.subscribe((error) => {
        this.errorLogin = error;
      });
    }
  }

  register() {
    if (this.registerForm.valid) {
      const {username, firstPassword, secondPassword, email, acceptTerms} = this.registerForm.value;
      this.authService.register(username, firstPassword, secondPassword, email, acceptTerms);
      this.authService.error$.subscribe((error) => {
        this.errorRegister = error;
      });
    }
  }
}
