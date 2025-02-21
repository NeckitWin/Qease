import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {BehaviorSubject} from 'rxjs';

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

  private userSubject = new BehaviorSubject(<User | undefined>(undefined));
  user$ = this.userSubject.asObservable();
  private errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
  }

  login(username: string, password: string) {
    if (!username || !password) {
      this.errorSubject.next('Wypełnij wszystkie pola');
      return;
    }
    const loginUser = {username, password};
    this.http.post<apiUser>(`${apiUrl}/login`, loginUser, {withCredentials: true}).subscribe((response) => {
      if (response.error) {
        this.errorSubject.next(response.error);
      } else {
        this.me();
        this.router.navigate(['']);
      }
    });
  }

  register(username: string, firstPassword: string, secondPassword: string, email: string, acceptTerms: boolean) {
      if (!(username && firstPassword && secondPassword && email && acceptTerms)) {
        this.errorSubject.next('Wypełnij wszystkie pola');
        return;
      }
      if (firstPassword !== secondPassword) {
        this.errorSubject.next('Hasła nie są takie same');
        return;
      }
      const registerUser = {username, password: firstPassword, email};
      this.http.post<apiData>(`${apiUrl}/register`, registerUser, {withCredentials: true}).subscribe((response) => {
        if (response.error) {
          this.errorSubject.next(response.error);
        } else {
          this.me();
          this.router.navigate(['']);
        }
      });
    }

  me() {
    this.http.get<apiUser>(`${apiUrl}/me`, { withCredentials: true }).subscribe((res) => {
      if (res) {
        this.userSubject.next(res.user);
      }
    });
  }

  logout() {
    this.http.get<apiData>(`${apiUrl}/logout`, { withCredentials: true }).subscribe((res) => {
      if (res.error) {
        console.error(res.error);
      } else {
        this.userSubject.next(undefined);
        this.router.navigate(['']);
      }
    });
  }

}
