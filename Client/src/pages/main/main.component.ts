import { Component } from '@angular/core';
import {BannerComponent} from '../../components/banner/banner.component';
import {FeaturesComponent} from './sections/features/features.component';
import {TeamComponent} from './sections/team/team.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [BannerComponent, FeaturesComponent, TeamComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

}
