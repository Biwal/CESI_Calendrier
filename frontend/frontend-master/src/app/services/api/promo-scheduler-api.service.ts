import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { PromoScheduler } from "src/app/models/classes/promo-scheduler";
import { map } from "rxjs/operators";
import { Promotion } from "src/app/models/classes/promotion";

@Injectable({
  providedIn: "root"
})
export class PromoSchedulerApiService {
  constructor(private http: HttpClient) {}

  getPromoSchedulers() {
    return this.http
      .get<PromoScheduler[]>(environment.apiUrl + "promotion_schedules")
      .pipe(
        map((json: PromoScheduler[]) => {
          return this.mapPromoSchedulers(json);
        })
      );
  }

  mapPromoSchedulers(json: PromoScheduler[]): PromoScheduler[] {
    const promoSchedulers = json.map<PromoScheduler>(
      data => new PromoScheduler(data)
    );
    promoSchedulers.forEach(element => this.mapOnePromoScheduler(element));
    return promoSchedulers;
  }

  mapOnePromoScheduler(promoScheduler: PromoScheduler) {
    promoScheduler.setPromotion(new Promotion(promoScheduler.getPromotion));
  }
  getOnePromoScheduler(id: number) {
    return this.http
      .get<PromoScheduler>(environment.apiUrl + "promotion_schedules/" + id)
      .pipe(
        map(json => {
          const promoScheduler = new PromoScheduler(json);
          return this.mapOnePromoScheduler(promoScheduler);
        })
      );
  }

  addPromoScheduler(promotionScheduler: PromoScheduler) {
    return this.http.post<PromoScheduler>(
      environment.apiUrl + "promotion_schedules",
      promotionScheduler
    );
  }

  updatePromoScheduler(promotionScheduler: PromoScheduler, id: number) {
    return this.http.put<PromoScheduler>(
      environment.apiUrl + "promotion_schedules/" + id,
      promotionScheduler
    );
  }

  deletePromoScheduler(id: number) {
    return this.http.delete<PromoScheduler>(
      environment.apiUrl + "promotion_schedules/" + id
    );
  }
}
