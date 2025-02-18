import {Component} from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../components/footer/footer.component';
import {HttpClient} from '@angular/common/http';

const api = 'http://localhost:3000';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  toastMessage: string = '';

  constructor(private http: HttpClient) {
    this.http.get(`${api}/get-cookie`).subscribe((res: any) => {
      if (res.error) {
        this.toastMessage = res.message;
      } else {
        this.toastMessage = 'Witaj ' + res.message;
      }
    });
  }
}
