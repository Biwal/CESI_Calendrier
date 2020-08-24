import { TestBed } from '@angular/core/testing';
import { PromoSchedulerApiService } from './promo-scheduler-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Promotion } from 'src/app/models/classes/promotion';
import { Pole } from 'src/app/models/classes/pole';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PromoScheduler } from 'src/app/models/classes/promo-scheduler';

describe('PromoSchedulerApiService', () => {
  const mockPoleData = new Pole({
    id: 4,
    name: 'informatique',
    color: '#ffb81c'
  });
  const mockPromotionData = new Promotion({
    id: 3,
    name: 'AP18',
    size: 5,
    isActive: true,
    pole: mockPoleData,
    promoSchedules: new Array<PromoScheduler>()
  });
  const mockPromoSchedulerData = new PromoScheduler({
    dateStart: new Date(),
    dateEnd: new Date(),
    promotion: mockPromotionData
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromoSchedulerApiService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

  function setup() {
    const promoSchedulerApiService: PromoSchedulerApiService = TestBed.get(
      PromoSchedulerApiService
    );
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    return { promoSchedulerApiService, httpTestingController };
  }

  it('should be created', () => {
    const service: PromoSchedulerApiService = TestBed.get(
      PromoSchedulerApiService
    );
    expect(service).toBeTruthy();
  });

  describe('getPromoSchedulers()', () => {
    it('should return the list of all the promotion Schedulers in the DB', () => {
      const { promoSchedulerApiService, httpTestingController } = setup();
      const mockPromoSchedulersData = [
        new PromoScheduler({
          id: 3,
          dateStart: new Date(),
          dateEnd: new Date(),
          promotion: mockPromotionData
        }),
        new PromoScheduler({
          id: 4,
          dateStart: new Date(),
          dateEnd: new Date(),
          promotion: mockPromotionData
        })
      ];
      promoSchedulerApiService.getPromoSchedulers().subscribe(
        (response: PromoScheduler[]) => {
          expect(response).toEqual(mockPromoSchedulersData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotion_schedules'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPromoSchedulersData);
    });
  });

  describe('getOnePromoScheduler(id:number)', () => {
    it('should return the selected promotion scheduler from the DB', () => {
      const { promoSchedulerApiService, httpTestingController } = setup();
      const id = mockPromoSchedulerData.getId;

      promoSchedulerApiService.getOnePromoScheduler(id).subscribe(
        (response: PromoScheduler) => {
          expect(response).toEqual(mockPromoSchedulerData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotion_schedules/' + id
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPromoSchedulerData);
    });
  });

  describe('addPromoScheduler(promotionScheduler:PromoScheduler)', () => {
    it('should add the promotion scheduler in the DB', () => {
      const { promoSchedulerApiService, httpTestingController } = setup();

      promoSchedulerApiService
        .addPromoScheduler(mockPromoSchedulerData)
        .subscribe(
          (response: PromoScheduler) => {
            expect(response).toBe(mockPromoSchedulerData);
          },
          error => {
            console.error(error);
          }
        );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotion_schedules'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockPromoSchedulerData);
    });
  });

  describe('updatePromoScheduler(promotionScheduler:PromoScheduler, id:number)', () => {
    it('should update the selected promotion scheduler in the DB', () => {
      const { promoSchedulerApiService, httpTestingController } = setup();
      const id = 2;
      mockPromoSchedulerData.setId(id);

      promoSchedulerApiService
        .updatePromoScheduler(mockPromoSchedulerData, id)
        .subscribe(
          (response: PromoScheduler) => {
            expect(response).toBe(mockPromoSchedulerData);
          },
          error => {
            console.error(error);
          }
        );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotion_schedules/' + id
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockPromoSchedulerData);
    });
  });

  describe('deletePromoScheduler(id:number)', () => {
    it('should delete the selected promotion scheduler', () => {
      const { promoSchedulerApiService, httpTestingController } = setup();
      const id = 2;
      promoSchedulerApiService.deletePromoScheduler(id).subscribe(
        (response: any) => {
          expect(response).toBe(id);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotion_schedules/' + id
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(id);
    });
  });
});
