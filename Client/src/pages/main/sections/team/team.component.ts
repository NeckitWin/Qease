import { Component } from '@angular/core';
import {NgForOf} from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [
    NgForOf
  ],
  standalone: true,
  templateUrl: './team.component.html'
})
export class TeamComponent {

  team: TeamMember[] = [
    {name: 'NeckitWin', position: 'Software Engineer', image: '/userIcon.png'},
    {name: 'NeckitWin', position: 'Web Developer', image: '/userIcon.png'},
    {name: 'NeckitWin', position: 'Web Designer', image: '/userIcon.png'},
  ]

}

interface TeamMember {
  name: string;
  position: string;
  image: string;
}
