import {Component, Input, ViewContainerRef} from '@angular/core';
import {FormGroup, NgControl} from '@angular/forms';
import {ColorPickerService} from 'ngx-color-picker';

@Component({
  selector: 'app-form-cpt-color',
  templateUrl: './form-cpt-color.component.html',
  styleUrls: ['./form-cpt-color.component.scss']
})
export class FormCptColorComponent {
  @Input() parentForm: FormGroup;
  @Input() labelName: string;
  @Input() inputName: string;
  public color = '#2889e9';

  onChangeColor(color) {
      this.parentForm.controls[this.inputName].setValue(color);
  }
}
