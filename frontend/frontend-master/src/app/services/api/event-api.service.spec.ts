import { TestBed } from '@angular/core/testing';

import { EventApiService } from './event-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Reservation } from 'src/app/models/classes/reservation';
import { Room } from 'src/app/models/classes/room';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Event } from 'src/app/models/classes/event';

describe('EventApiService', () => {
  const mockRoomData = new Room({
    id: 1,
    name: 'Westeros',
    capacity: 18,
    reservations: new Array<Reservation>()
  });
  const mockReservationData = new Reservation({
    dateStart: new Date(),
    dateEnd: new Date(),
    room: mockRoomData,
    id: 6
  });
  const mockEventData = new Event({
    id: 65,
    name: 'Orion',
    capacity: 15,
    isPrivate: false,
    reservation: mockReservationData
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EventApiService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

  function setup() {
    const eventApiService: EventApiService = TestBed.get(EventApiService);
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    return { eventApiService, httpTestingController };
  }

  it('should be created', () => {
    const service: EventApiService = TestBed.get(EventApiService);
    expect(service).toBeTruthy();
  });

  describe('getEvents()', () => {
    it('should return the list of all the Events in the DB', () => {
      const { eventApiService, httpTestingController } = setup();
      const mockEventsData = [
        new Event({
          id: 3,
          name: 'block',
          capacity: 50,
          isPrivate: false,
          reservation: mockReservationData
        }),
        new Event({
          id: 4,
          name: 'ia',
          capacity: 5,
          isPrivate: true,
          reservation: mockReservationData
        })
      ];

      eventApiService.getEvents().subscribe(
        response => {
          expect(response).toEqual(mockEventsData);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'events'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockEventsData);
    });
  });

  describe('getOneEvent(id:number)', () => {
    it('should return the selected event from the DB', () => {
      const { eventApiService, httpTestingController } = setup();
      const id = 4;
      const mockEventData = new Event({
        id: { id },
        name: 'block',
        capacity: 50,
        isPrivate: false,
        reservation: mockReservationData
      });

      eventApiService.getOneEvent(id).subscribe(
        (response: any) => {
          expect(response).toEqual(mockEventData);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'events/' + id
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockEventData);
    });
  });

  describe('addEvent(event:Event)', () => {
    it('should add the event in the DB', () => {
      const { eventApiService, httpTestingController } = setup();

      eventApiService.addEvent(mockEventData).subscribe(
        (response: Event) => {
          expect(response).toBe(mockEventData);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'events'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockEventData);
    });
  });

  describe('updateEvent(event:Event, id:number)', () => {
    it('should update the selected event in the DB', () => {
      const { eventApiService, httpTestingController } = setup();
      const id = 1;

      eventApiService.updateEvent(mockEventData, id).subscribe(
        (response: Event) => {
          expect(response).toBe(mockEventData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'events/' + id
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockEventData);
    });
  });

  describe('deleteEvent(id:number)', () => {
    it('should delete the selected event in the DB', () => {
      const { eventApiService, httpTestingController } = setup();
      const id = 1;

      eventApiService.deleteEvent(id).subscribe(
        (response: any) => {
          expect(response).toBe(id);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'events/' + id
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(id);
    });
  });
});
