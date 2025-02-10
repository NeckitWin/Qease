import { Component } from '@angular/core';
import { HeaderComponent } from '../components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html'
})
export class AppComponent {
  title = 'Client';
}
