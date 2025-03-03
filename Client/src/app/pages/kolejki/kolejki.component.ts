import { Component } from '@angular/core';
import {SearchComponent} from './search/search.component';
import {QueueListComponent} from './queue-list/queue-list.component';

@Component({
  selector: 'app-kolejki',
  standalone: true,
  imports: [SearchComponent, QueueListComponent],
  templateUrl: './kolejki.component.html',
  styleUrl: './kolejki.component.css'
})
export class KolejkiComponent {

}
