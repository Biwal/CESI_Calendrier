import {Component, Input, OnInit} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {PromotionApiService} from '../../../services/api/promotion-api.service';
import {Promotion} from '../../../models/classes/promotion';

@Component({
  selector: 'app-form-cpt-promotion',
  templateUrl: './form-cpt-promotion.component.html',
  styleUrls: ['./form-cpt-promotion.component.scss']
})
export class FormCptPromotionComponent implements OnInit {
  @Input() parentForm: FormGroup;
  promosList$: Observable<Promotion[]>;

  constructor(private promotionApiService: PromotionApiService) { }

  ngOnInit() {
    this.promosList$ = this.promotionApiService.getPromotions();
  }
  compareFn(optOne, optTwo) {
    return optOne.getName === optTwo.getName;
  }
}

