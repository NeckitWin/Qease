import { Routes } from '@angular/router';
import {MainComponent} from '../pages/main/main.component';
import {PracownikiComponent} from '../pages/pracowniki/pracowniki.component';
import {LoginComponent} from '../pages/login/login.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'pracowniki', component: PracownikiComponent},
  {path: 'login', component: LoginComponent}
];
