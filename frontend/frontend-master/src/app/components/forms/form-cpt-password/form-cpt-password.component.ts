import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-password',
  templateUrl: './form-cpt-password.component.html',
  styleUrls: ['./form-cpt-password.component.scss']
})
export class FormCptPasswordComponent   {
  @Input() inputName: string;
  @Input() parentForm: FormGroup;
}
