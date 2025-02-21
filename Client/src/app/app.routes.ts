import { Routes } from '@angular/router';
import {MainComponent} from './pages/main/main.component';
import {LoginComponent} from './pages/login/login.component';
import {KolejkiComponent} from './pages/kolejki/kolejki.component';
import {ProfilComponent} from './pages/profil/profil.component';

export const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'kolejki', component: KolejkiComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profil', component: ProfilComponent}
];
