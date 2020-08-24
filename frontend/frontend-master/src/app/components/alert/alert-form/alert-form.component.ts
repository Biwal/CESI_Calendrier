import { Component } from '@angular/core';
import {animate, style, transition, trigger} from '@angular/animations';

@Component({
  selector: 'app-alert-form',
  templateUrl: './alert-form.component.html',
  styleUrls: ['./alert-form.component.scss'],
  animations: [
    trigger('display', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('0.8s', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('0.5s', style({ opacity: 0 }))
      ])
    ]),
  ],
})
export class AlertFormComponent {
  type: 'success'|'error';
  message: string;

  displayAlert(type: 'success'|'error', message) {
    this.type = type;
    this.message = message;
    window.setTimeout(() => {
      this.message = null;
    }, 2000);
  }
}
