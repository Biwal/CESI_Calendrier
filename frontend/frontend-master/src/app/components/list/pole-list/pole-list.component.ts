import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PoleApiService } from '../../../services/api/pole-api.service';
import { Pole } from '../../../models/classes/pole';

@Component({
  selector: 'app-pole-list',
  templateUrl: './pole-list.component.html',
  styleUrls: ['./pole-list.component.scss']
})
export class PoleListComponent {
  polesList$: BehaviorSubject<Pole[]> = new BehaviorSubject([]);
  @Output() selectPole = new EventEmitter<Pole>();

  constructor(private poleApiService: PoleApiService) {
    this.getPolesList();
  }

  getPolesList() {
    this.poleApiService
      .getPoles()
      .subscribe(poles => this.polesList$.next(poles));
  }

  onSelectPole(value) {
    this.selectPole.emit(value);
  }
  trackByPoleId(index: number, pole: Pole) {
    return pole ? pole.getId : null;
  }
}
