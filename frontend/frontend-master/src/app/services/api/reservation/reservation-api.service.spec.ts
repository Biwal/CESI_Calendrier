import { TestBed } from '@angular/core/testing';
import { ReservationApiService } from './reservation-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { Room } from 'src/app/models/classes/room';
import { Reservation } from 'src/app/models/classes/reservation';

describe('ReservationApiService', () => {
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
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ReservationApiService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

  function setup() {
    const reservationService: ReservationApiService = TestBed.get(
      ReservationApiService
    );
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    return { reservationService, httpTestingController };
  }

  it('should be created', () => {
    const service: ReservationApiService = TestBed.get(ReservationApiService);
    expect(service).toBeTruthy();
  });

  describe('getReservations()', () => {
    it('should return the list of all the reservations in the DB', () => {
      const { reservationService, httpTestingController } = setup();
      const mockReservationsData = [
        new Reservation({
          id: 4,
          dateStart: new Date(),
          dateEnd: new Date(),
          room: mockRoomData
        }),
        new Reservation({
          id: 5,
          dateStart: new Date(),
          dateEnd: new Date(),
          room: mockRoomData
        })
      ];

      reservationService.getReservations().subscribe(
        (response: Reservation[]) => {
          expect(response).toEqual(mockReservationsData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'reservations'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockReservationsData);
    });
  });

  describe('getOneReservation(id:number)', () => {
    it('should return the selected reservation from the DB', () => {
      const { reservationService, httpTestingController } = setup();
      const id = mockReservationData.getId;

      reservationService.getOneReservation(id).subscribe(
        (response: Reservation) => {
          expect(response).toEqual(mockReservationData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'reservations/' + id
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockReservationData);
    });
  });

  describe('addReservation(reservation:Reservation)', () => {
    it('should add the reservation in the DB', () => {
      const { reservationService, httpTestingController } = setup();

      reservationService.addReservation(mockReservationData).subscribe(
        (response: Reservation) => {
          expect(response).toBe(mockReservationData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'reservations'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockReservationData);
    });
  });

  describe('updateReservation(reservation:Reservation, id:number', () => {
    it('should update the selected Reservation in the DB', () => {
      const { reservationService, httpTestingController } = setup();
      const id = mockReservationData.getId;

      mockReservationData.setId(id);
      reservationService.updateReservation(mockReservationData, id).subscribe(
        (response: Reservation) => {
          expect(response).toBe(mockReservationData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'reservations/' + id
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockReservationData);
    });
  });

  describe('deleteReservation(id:number)', () => {
    it('should delete the selected reservation in the DB', () => {
      const { reservationService, httpTestingController } = setup();
      const id = 2;

      reservationService
        .deleteReservation(id)
        .subscribe((response: any) => {
          expect(response).toBe(id);
        });

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'reservations/' + id
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(id);
    });
  });
});
