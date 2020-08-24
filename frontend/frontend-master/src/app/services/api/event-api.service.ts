import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Event } from "src/app/models/classes/event";
import { map } from "rxjs/operators";
import { Reservation } from "src/app/models/classes/reservation";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: "root"
})
export class EventApiService {
  constructor(private http: HttpClient) {}

  getEvents() {
    return this.http.get<Event[]>(environment.apiUrl + "events").pipe(
      map((json: Event[]) => {
        return this.mapEvents(json);
      })
    );
  }

  mapEvents(json: Event[]): Event[] {
    const events = json.map<Event>(data => new Event(data));
    events.forEach(element => {
      this.mapOneEvent(element);
    });
    return events;
  }
  mapOneEvent(event: Event) {
    event.setReservation(new Reservation(event.getReservation));
  }

  getOneEvent(id: number): Observable<Event> {
    return this.http.get<Event>(environment.apiUrl + "events/" + id).pipe(
      map(json => {
        const event = new Event(json);
        this.mapOneEvent(event);
        return event;
      })
    );
  }

  addEvent(event: Event) {
    return this.http.post<Event>(environment.apiUrl + "events", event);
  }

  updateEvent(event: Event, id: number) {
    return this.http.put<Event>(environment.apiUrl + "events/" + id, event);
  }

  deleteEvent(id: number) {
    return this.http.delete<Event>(environment.apiUrl + "events/" + id);
  }
}
