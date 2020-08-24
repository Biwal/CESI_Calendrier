import {
  ChangeDetectorRef,
  Component, ElementRef, EventEmitter,
  HostListener, Input, NgZone,
  OnInit, Output,
  ViewChild
} from '@angular/core';
import {Moment} from 'moment';
import * as moment from 'moment';
import { setTime } from '../../utils/MomentUtils';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {NgControl} from '@angular/forms';

@Component({
  selector: 'app-own-date-time-picker',
  templateUrl: './own-date-time-picker.component.html',
  styleUrls: ['./own-date-time-picker.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      transition('* => open', [
        animate('0.3s')
      ]),
    ]),
  ],
})

export class OwnDateTimePickerComponent implements OnInit {
  @ViewChild('insideDatePickerElement', { static: false }) insideElement;

  private pickerState: 'datetime'|'year';
  private yearPickerReferentDate: Moment;
  private opened: boolean;
  private referentDate: Moment;
  private chosenDate: Moment;
  private control: NgControl;
  private leftX: number;
  @Output() closeEvent = new EventEmitter<string>();
  @Input() type: string;

  constructor(private cd: ChangeDetectorRef) {
    this.referentDate = moment();
    this.chosenDate = moment().set({seconds: 0});
    this.yearPickerReferentDate = moment();
    this.opened = false;
    this.pickerState = 'datetime';
  }

  addHour(nbr) {
    this.chosenDate.add(nbr, 'hours');
    this.updateInputValue();
  }

  addMinute(nbr) {
    this.chosenDate.add(nbr, 'minutes');
    this.updateInputValue();
  }

  hoursChanged($event) {
    setTime(this.chosenDate, $event.target.value);
    this.updateInputValue();
  }

  minutesChanged($event) {
    setTime(this.chosenDate, this.chosenDate.format('HH:') + $event.target.value + ':00');
    this.updateInputValue();
  }

  next() {
    if (this.pickerState === 'datetime') {
      this.referentDate.add(1, 'months');
    } else {
      this.yearPickerReferentDate.add(15, 'years');
    }
  }

  previous() {
    if (this.pickerState === 'datetime') {
      this.referentDate.add(-1, 'months');
    } else {
      this.yearPickerReferentDate.add(-15, 'years');
    }
  }

  ngOnInit() {
  }

  open(control: NgControl) {
    this.control = control;
    if (control.control.value !== '' && moment(control.control.value).isValid()) {
      this.referentDate = moment(control.control.value, 'YYYY-MM-DDTHH:mm:ss');
      this.chosenDate = this.referentDate;
      this.yearPickerReferentDate = this.referentDate;
    }
    this.updateInputValue();
    setTimeout(() => {
      this.opened = true;
      this.cd.detectChanges();
    }, 50);
  }

  @HostListener('document:click', ['$event'])
  clickOut(event) {
    // tslint:disable-next-line:radix
    if (this.opened && isNaN(parseInt(event.target.innerText)) && !this.insideElement.nativeElement.contains(event.target)) {
      this.opened = false;
      if (this.closeEvent) this.closeEvent.emit(this.getValue());
      return;
    }
  }

  protected getDates() {
    const dates = [];
    const startDay = this.referentDate.clone().startOf('month').startOf('week');
    const startMonth = this.referentDate.clone().startOf('month');
    const endMonth = this.referentDate.clone().endOf('month');
    for (let i = 0; i < 42; i++) {
      const date = startDay.clone().add(i, 'days');
      // tslint:disable-next-line:radix
      const nbrDay = parseInt(date.format('DD'));
      dates.push({
        date,
        number: nbrDay,
        chosen: date.format('YYYY-MM-DD') === this.chosenDate.format('YYYY-MM-DD'),
        isToday: date.isSame(moment()),
        isBefore: date.isBefore(startMonth),
        isAfter: date.isAfter(endMonth)
      });
    }

    return dates;
  }

  protected getYears() {
    const years = [];
    for (let i = -7; i < 8; i++) {
      years.push(this.yearPickerReferentDate.clone().add(i, 'years').format('YYYY'));
    }
    return years;
  }

  onClickDate(date: any) {
    if (date.isBefore) {
      this.previous();
      return;
    }
    if (date.isAfter) {
      this.next();
      return;
    }

    this.chosenDate = setTime(date.date, this.chosenDate.format('HH:mm:ss'));
    this.updateInputValue();
  }

  updateInputValue() {
    this.control.control.setValue(this.getValue());
  }

  getValue() {
    return this.type && this.type === 'timepicker' ? this.chosenDate.format('HH:mm') : this.chosenDate.format('YYYY-MM-DDTHH:mm:ss');
  }

  getDate() {
    return (this.pickerState === 'datetime' ? this.referentDate.format( 'MMMM YYYY') : this.yearPickerReferentDate.format('DD MMMM'));
  }

  getHours() {
    return this.chosenDate.format('HH');
  }

  getMinutes() {
    return this.chosenDate.format('mm');
  }

  switchPicker() {
    this.pickerState = this.pickerState === 'datetime' ? 'year' : 'datetime';
    // tslint:disable-next-line:radix
    if (this.pickerState === 'year') { this.yearPickerReferentDate.set({years: parseInt(this.chosenDate.format('YYYY'))}); }
  }

  choseYear(year: any) {
      this.chosenDate.set({years: year});
      this.referentDate.set({years: year});
      this.yearPickerReferentDate.set({years: year});
      this.updateInputValue();
  }
}
