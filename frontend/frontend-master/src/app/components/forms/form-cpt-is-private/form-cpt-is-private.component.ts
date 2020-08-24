import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-is-private',
  templateUrl: './form-cpt-is-private.component.html',
  styleUrls: ['./form-cpt-is-private.component.scss']
})
export class FormCptIsPrivateComponent {
  @Input() parentForm: FormGroup;
}
