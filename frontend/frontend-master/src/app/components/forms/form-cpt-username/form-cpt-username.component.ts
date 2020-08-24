import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-username',
  templateUrl: './form-cpt-username.component.html',
  styleUrls: ['./form-cpt-username.component.scss']
})
export class FormCptUsernameComponent {
  @Input() parentForm: FormGroup;
}
