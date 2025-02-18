import { Routes } from '@angular/router';
import {MainComponent} from '../pages/main/main.component';
import {LoginComponent} from '../pages/login/login.component';
import {KolejkiComponent} from '../pages/kolejki/kolejki.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'kolejki', component: KolejkiComponent},
  {path: 'login', component: LoginComponent}
];
