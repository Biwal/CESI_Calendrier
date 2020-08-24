import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-check',
  templateUrl: './modal-check.component.html',
  styleUrls: ['./modal-check.component.scss']
})
export class ModalCheckComponent implements OnInit {
  @Output() doModification = new EventEmitter<boolean>();
  message: any = '';
  modalFusion: any = false;
  constructor() { }

  ngOnInit() {
  }

  onYes() {
    this.doModification.emit(true);
  }

  onNo() {
    this.doModification.emit(false);
  }

  pop(message: string) {
    this.modalFusion = true;
    this.message = message;
  }

  hide() {
    this.modalFusion = false;
  }
}
