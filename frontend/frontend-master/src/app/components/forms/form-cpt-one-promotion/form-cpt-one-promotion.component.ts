import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Promotion } from 'src/app/models/classes/promotion';
import { PromotionApiService } from 'src/app/services/api/promotion-api.service';


@Component({
  selector: 'app-form-cpt-one-promotion',
  templateUrl: './form-cpt-one-promotion.component.html',
  styleUrls: ['./form-cpt-one-promotion.component.scss']
})
export class FormCptOnePromotionComponent implements OnInit {
@Input() parentForm: FormGroup;
promotionsList$: Observable<Promotion[]>;
  constructor(private promotionApiService: PromotionApiService) { }

  ngOnInit() {
    this.promotionsList$ = this.promotionApiService.getPromotions();
  }

 compareFn(optOne, optTwo) {
    return optOne.getName === optTwo.getName;
  }
}
