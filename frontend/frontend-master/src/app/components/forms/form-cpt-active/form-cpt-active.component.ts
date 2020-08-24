import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-active',
  templateUrl: './form-cpt-active.component.html',
  styleUrls: ['./form-cpt-active.component.scss']
})
export class FormCptActiveComponent {
  @Input() parentForm: FormGroup;
}

