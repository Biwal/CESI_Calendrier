import { TestBed } from '@angular/core/testing';

import { PromotionApiService } from './promotion-api.service';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { Pole } from 'src/app/models/classes/pole';
import { HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Promotion } from 'src/app/models/classes/promotion';
import { PromoScheduler } from 'src/app/models/classes/promo-scheduler';

describe('PromotionApiService', () => {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PromotionApiService],
      imports: [HttpClientTestingModule]
    });
  });

  afterEach(() => {
    const { httpTestingController } = setup();
    httpTestingController.verify();
  });

  function setup() {
    const promotionApiService: PromotionApiService = TestBed.get(
      PromotionApiService
    );
    const httpTestingController: HttpTestingController = TestBed.get(
      HttpTestingController
    );
    return { promotionApiService, httpTestingController };
  }

  it('should be created', () => {
    const service: PromotionApiService = TestBed.get(PromotionApiService);
    expect(service).toBeTruthy();
  });

  describe('getPromotions()', () => {
    it('should return the list of all the promotions in the DB', () => {
      const { promotionApiService, httpTestingController } = setup();
      const mockPromotionsData = [
        new Promotion({
          id: 1,
          name: 'ser',
          size: 24,
          active: true,
          pole: mockPoleData,
          promoSchedules: new Array<PromoScheduler>()
        }),
        new Promotion({
          id: 2,
          name: 'aze',
          size: 26,
          active: true,
          pole: mockPoleData,
          promoSchedules: new Array<PromoScheduler>()
        })
      ];

      promotionApiService.getPromotions().subscribe(
        (response: Promotion[]) => {
          expect(response).toEqual(mockPromotionsData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotions'
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPromotionsData);
    });
  });

  describe('getOnePromotion(id:number)', () => {
    it('should return the selected promotion from the DB', () => {
      const { promotionApiService, httpTestingController } = setup();
      const id = mockPromotionData.getId;

      promotionApiService.getOnePromotion(id).subscribe(
        (response: Promotion) => {
          expect(response).toEqual(mockPromotionData);
        },
        error => {
          console.error(error);
        }
      );
      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotions/' + id
      );
      expect(req.request.method).toBe('GET');
      req.flush(mockPromotionData);
    });
  });

  describe('addPromotion(promotion:Promotion)', () => {
    it('should add the promotion in the DB', () => {
      const { promotionApiService, httpTestingController } = setup();

      promotionApiService.addPromotion(mockPromotionData).subscribe(
        (response: Promotion) => {
          expect(response).toBe(mockPromotionData);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotions'
      );
      expect(req.request.method).toBe('POST');
      req.flush(mockPromotionData);
    });
  });

  describe('updatePromotion(promotion:Promotion, id:number', () => {
    it('should update the selected promotion in the DB', () => {
      const { promotionApiService, httpTestingController } = setup();
      const id = mockPromotionData.getId;

      promotionApiService.updatePromotion(mockPromotionData, id).subscribe(
        (response: Promotion) => {
          expect(response).toBe(mockPromotionData);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotions/' + id
      );
      expect(req.request.method).toBe('PUT');
      req.flush(mockPromotionData);
    });
  });

  describe('deletePromotion(id:number)', () => {
    it('should delete the selected promotion in the DB', () => {
      const { promotionApiService, httpTestingController } = setup();
      const id = 2;

      promotionApiService.deletePromotion(id).subscribe(
        (response: any) => {
          expect(response).toBe(id);
        },
        error => {
          console.error(error);
        }
      );

      const req = httpTestingController.expectOne(
        environment.apiUrl + 'promotions/' + id
      );
      expect(req.request.method).toBe('DELETE');
      req.flush(id);
    });
  });
});
