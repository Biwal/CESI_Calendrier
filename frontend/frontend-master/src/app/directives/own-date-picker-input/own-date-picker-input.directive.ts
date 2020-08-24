import {
  Directive,
  ElementRef,
  HostListener,
  Input, Optional,
} from '@angular/core';
import {OwnDateTimePickerComponent} from '../../components/own-date-time-picker/own-date-time-picker.component';
import {NgControl} from '@angular/forms';

@Directive({
  selector: 'input[appOwnDateTime]',
  exportAs: 'appOwnDateTime'
})
export class OwnDatePickerInputDirective {
  @Input()
  public appOwnDateTime: OwnDateTimePickerComponent;

  @Input()
  public test: string;

  constructor(@Optional() private control: NgControl, private el: ElementRef) {
  }

  @HostListener('click') onMouseClick() {
    if (this.appOwnDateTime && this.control) {
      this.appOwnDateTime.open(this.control);
      this.el.nativeElement.blur();
    }
  }
}
