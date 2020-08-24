import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-name',
  templateUrl: './form-cpt-name.component.html',
  styleUrls: ['./form-cpt-name.component.scss']
})
export class FormCptNameComponent{
  @Input() parentForm: FormGroup;
}
