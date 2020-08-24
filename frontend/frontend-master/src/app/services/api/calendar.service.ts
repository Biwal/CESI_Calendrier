import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {EventInterface} from '../../components/own-calendar/own-calendar.component';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {
  constructor(private http: HttpClient) {}

  getCalendarForWeek(datetime: Date) {
    const params = new HttpParams().set('date', datetime.toJSON());
    const resas = this.http.get<EventInterface[]>(environment.apiUrl + 'frontoffice/get-bookings-for-week', {
      params
    });

    const daysoff = this.http.get<EventInterface[]>(environment.apiUrl + 'frontoffice/daysoff', {
      params
    });

    return forkJoin(resas, daysoff);
  }

  getCalendarForDay(datetime: Date) {
    const params = new HttpParams().set('date', datetime.toJSON());
    const resas = this.http.get<EventInterface[]>(environment.apiUrl + 'frontoffice/get-bookings-for-day', {
      params
    });

    const daysoff = this.http.get<EventInterface[]>(environment.apiUrl + 'frontoffice/daysoff', {
      params
    });

    return forkJoin([resas, daysoff]);
  }
}
