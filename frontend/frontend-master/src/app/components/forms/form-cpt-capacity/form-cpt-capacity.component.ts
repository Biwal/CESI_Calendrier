import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-form-cpt-capacity',
  templateUrl: './form-cpt-capacity.component.html',
  styleUrls: ['./form-cpt-capacity.component.scss']
})
export class FormCptCapacityComponent {
  @Input() parentForm: FormGroup;
}
