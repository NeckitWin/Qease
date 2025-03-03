import { Component } from '@angular/core';
import {QueueItemComponent} from '../queue-item/queue-item.component';

@Component({
  selector: 'app-queue-list',
  standalone: true,
  imports: [QueueItemComponent],
  templateUrl: './queue-list.component.html',
  styleUrl: './queue-list.component.css'
})
export class QueueListComponent {

}
