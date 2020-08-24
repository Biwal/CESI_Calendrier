import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: "app-btn-gestion-add",
  templateUrl: "./btn-gestion-add.component.html",
  styleUrls: ["./btn-gestion-add.component.scss"]
})
export class BtnGestionAddComponent {
  @Output() resetForm = new EventEmitter<object>();

  onAdd() {
    this.resetForm.emit(undefined);
  }
}
