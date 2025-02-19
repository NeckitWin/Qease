import {Component} from '@angular/core';
import {HeaderComponent} from '../components/header/header.component';
import {RouterOutlet} from '@angular/router';
import {FooterComponent} from '../components/footer/footer.component';
import {APP_BASE_HREF} from '@angular/common';

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
