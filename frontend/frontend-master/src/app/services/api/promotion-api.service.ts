import { Injectable } from '@angular/core';
import { Promotion } from 'src/app/models/classes/promotion';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';
import { Pole } from 'src/app/models/classes/pole';
import { PromoScheduler } from 'src/app/models/classes/promo-scheduler';

@Injectable({
  providedIn: 'root'
})
export class PromotionApiService {
  constructor(private http: HttpClient) {}

  getPromotions() {
    return this.http.get<Promotion[]>(environment.apiUrl + 'promotions').pipe(
      map((json: Promotion[]) => {
        return this.mapPromotions(json);
      })
    );
  }

  getPromotionsPresentsAtDate(dateStart, dateEnd) {
    const params = new HttpParams()
      .set('dateStart', dateStart)
      .set('dateEnd', dateEnd);
    // /promotions/get-active-for-week
    return this.http
      .get<Promotion[]>(environment.apiUrl + 'promotions/get-active-for-week', {
        params
      })
      .pipe(
        map((json: Promotion[]) => {
          return this.mapPromotions(json);
        })
      );
  }

  mapPromotions(json: Promotion[]): Promotion[] {
    const promotions = json.map<Promotion>(data => new Promotion(data));
    promotions.forEach(element => this.mapOnePromotion(element));
    return promotions;
  }

  mapOnePromotion(promotion: Promotion) {
    promotion.setPole(new Pole(promotion.getPole));
    promotion.setPromoSchedules(
      promotion.getPromoSchedules.map<PromoScheduler>(
        data => new PromoScheduler(data)
      )
    );
  }

  getOnePromotion(id: number) {
    return this.http
      .get<Promotion>(environment.apiUrl + 'promotions/' + id)
      .pipe(
        map(json => {
          const promotion = new Promotion(json);
          return this.mapOnePromotion(promotion);
        })
      );
  }

  addPromotion(promotion: Promotion) {
    return this.http.post<Promotion>(
      environment.apiUrl + 'promotions',
      promotion
    );
  }

  updatePromotion(promotion: Promotion, id: number) {
    return this.http.put<Promotion>(
      environment.apiUrl + 'promotions/' + id,
      promotion
    );
  }

  deletePromotion(id: number) {
    return this.http.delete<Promotion>(environment.apiUrl + 'promotions/' + id);
  }
}
