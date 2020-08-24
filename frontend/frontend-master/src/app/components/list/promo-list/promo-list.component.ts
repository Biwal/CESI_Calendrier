import { Component, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PromotionApiService } from '../../../services/api/promotion-api.service';
import { Promotion } from '../../../models/classes/promotion';

@Component({
  selector: 'app-promo-list',
  templateUrl: './promo-list.component.html',
  styleUrls: ['./promo-list.component.scss']
})
export class PromoListComponent {
  promosList$: BehaviorSubject<Promotion[]> = new BehaviorSubject([]);
  @Output() selectPromo = new EventEmitter<Promotion>();

  constructor(private promotionApiService: PromotionApiService) {
    this.getPromosList();
  }

  getPromosList() {
    this.promotionApiService
      .getPromotions()
      .subscribe(promotions => {
        this.promosList$.next(promotions);
      });
  }

  onSelectPromo(value) {
    this.selectPromo.emit(value);
  }

  trackByPromotionId(index: number, promotion: Promotion) {
    return promotion ? promotion.getId : null;
  }
}
