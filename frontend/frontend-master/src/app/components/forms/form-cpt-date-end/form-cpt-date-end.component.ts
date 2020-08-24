import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: "app-form-cpt-date-end",
  templateUrl: "./form-cpt-date-end.component.html",
  styleUrls: ["./form-cpt-date-end.component.scss"]
})
export class FormCptDateEndComponent {
  @Input() parentForm: FormGroup;
  @Output() changed = new EventEmitter<boolean>();

  checkPromos(){
    this.changed.emit(true);
  }
}
