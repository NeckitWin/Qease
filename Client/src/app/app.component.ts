import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {APP_BASE_HREF} from '@angular/common';
import {HeaderComponent} from './components/header/header.component';
import {FooterComponent} from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterOutlet],
  templateUrl: './app.component.html',
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'}
  ]
})
export class AppComponent {
  toastMessage: string = '';
}
