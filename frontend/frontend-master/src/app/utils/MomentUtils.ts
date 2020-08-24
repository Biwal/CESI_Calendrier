import * as moment from 'moment';
import {Moment} from 'moment';

export function getFormat(date: Moment) {
  return date.format('DD/MM/YYYY HH:mm');
}

export function setTime(date: Moment, time: string) {
  return date.set({
    hour: parseInt(time.split(':')[0]),
    minute: parseInt(time.split(':')[1]),
    second: parseInt(time.split(':')[2])
  });
}

export function getTimeIntervalInMinutes(startTime: Moment, endTime: Moment) {
  const splittedStartDate = startTime.format('HH:mm').split(':');
  const splittedEndDate = endTime.format('HH:mm').split(':');

  // tslint:disable-next-line:radix
  let intervalMinutes = (parseInt(splittedEndDate[0]) - parseInt(splittedStartDate[0])) * 60;
  // tslint:disable-next-line:radix
  const diffMinutes = parseInt(splittedEndDate[1]) - parseInt(splittedStartDate[1]);
  intervalMinutes += diffMinutes;

  return intervalMinutes;
}

export function getMinutesDiff(diff) {
  return (diff._data.hours * 60) + diff._data.minutes;
}
