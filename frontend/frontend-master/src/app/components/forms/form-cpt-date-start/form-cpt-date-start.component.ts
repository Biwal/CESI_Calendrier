import {ChangeDetectionStrategy, Component, Input, Output, EventEmitter} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-date-start',
  templateUrl: './form-cpt-date-start.component.html',
  styleUrls: ['./form-cpt-date-start.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormCptDateStartComponent {
  @Input() parentForm: FormGroup;
  @Output() changed = new EventEmitter<boolean>();

  checkPromos() {
    this.changed.emit(true);
  }
}
