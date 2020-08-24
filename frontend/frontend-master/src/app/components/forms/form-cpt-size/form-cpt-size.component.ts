import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-size',
  templateUrl: './form-cpt-size.component.html',
  styleUrls: ['./form-cpt-size.component.scss']
})
export class FormCptSizeComponent {
  @Input() parentForm: FormGroup;
}
