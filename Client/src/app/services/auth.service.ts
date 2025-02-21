import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

const apiUrl: string = 'http://localhost:3000';

interface apiData {
  message: string;
  error?: string;
}

interface User {
  id: number;
  username: string;
  email: string;
  password: string;
}

interface apiUser {
  user: User;
  error?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  get user(): User | undefined {
    return this._user;
  }

  set user(value: User | undefined) {
    this._user = value;
  }
  get errorMessage(): string {
    return this._errorMessage;
  }

  set errorMessage(value: string) {
    this._errorMessage = value;
  }
  private _errorMessage: string = '';
  private _user: User | undefined;

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    if (!username || !password) {
      this.errorMessage = 'Wypełnij wszystkie pola';
      return;
    }
    const loginUser = {username, password};
    this.http.post<apiUser>(`${apiUrl}/login`, loginUser, {withCredentials: true}).subscribe((response) => {
      if (response.error) {
        this.errorMessage = response.error;
      } else {
        this.router.navigate(['']);
      }
    });
  }

  register(username: string, firstPassword: string, secondPassword: string, email: string, acceptTerms: boolean) {
      if (!(username && firstPassword && secondPassword && email && acceptTerms)) {
        this.errorMessage = 'Wypełnij wszystkie pola';
        return;
      }
      if (firstPassword !== secondPassword) {
        this.errorMessage = 'Hasła nie są takie same';
        return;
      }
      const registerUser = {username, password: firstPassword, email};
      this.http.post<apiData>(`${apiUrl}/register`, registerUser, {withCredentials: true}).subscribe((response) => {
        if (response.error) {
          this.errorMessage = response.error;
        } else {
          this.router.navigate(['']);
        }
      });
    }

  me() {
    this.http.get<apiUser>(`${apiUrl}/me`, { withCredentials: true }).subscribe((res) => {
      if (res) {
        this.user = res.user;
        console.log(this.user);
      }
    });
  }

  logout() {
    this.http.get<apiData>(`${apiUrl}/logout`, { withCredentials: true }).subscribe((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        this.user = undefined;
        this.router.navigate(['']);
      }
    });
  }

}
