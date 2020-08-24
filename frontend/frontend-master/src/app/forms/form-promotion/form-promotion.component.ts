import {
  Component,
  ViewChild,
  Input,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormCptSizeComponent } from 'src/app/components/forms/form-cpt-size/form-cpt-size.component';
import { FormCptActiveComponent } from 'src/app/components/forms/form-cpt-active/form-cpt-active.component';
import { FormCptPoleComponent } from 'src/app/components/forms/form-cpt-pole/form-cpt-pole.component';
import { Promotion } from 'src/app/models/classes/promotion';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PromotionApiService } from 'src/app/services/api/promotion-api.service';

@Component({
  selector: 'app-form-promotion',
  templateUrl: './form-promotion.component.html',
  styleUrls: ['./form-promotion.component.scss']
})
export class FormPromotionComponent implements AfterContentInit {
  @ViewChild(FormCptNameComponent, { static: false })
  FormCptNameComponent: FormCptNameComponent;
  @ViewChild(FormCptSizeComponent, { static: false })
  FormCptSizeComponent: FormCptSizeComponent;
  @ViewChild(FormCptActiveComponent, { static: false })
  FormCptActiveComponent: FormCptActiveComponent;
  @ViewChild(FormCptPoleComponent, { static: false })
  FormCptPoleComponent: FormCptPoleComponent;
  @Input() promotion: Promotion;
  promotionForm: FormGroup;
  @Output() formCompleted = new EventEmitter<boolean>();
  listPromoSchedules: any[];
  @Output() errorRaised = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private promotionApiService: PromotionApiService
  ) {
    this.listPromoSchedules = [];
  }

  ngAfterContentInit() {
    this.listPromoSchedules = this.promotion ? this.promotion.getPromoSchedules : [];
    this.promotionForm = this.promotion
      ? this.initUpdateForm(this.promotion)
      : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      size: [
        '',
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(100),
          Validators.pattern('\\d*')
        ])
      ],
      active: [true, Validators.required],
       pole: ['', Validators.required]
    });
  }

  initUpdateForm(promotion: Promotion): FormGroup {
    return this.fb.group({
      name: [promotion.getName, Validators.required],
      size: [
        promotion.getSize,
        Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(500),
          Validators.pattern('\\d*')
        ])
      ],
      active: [promotion.getActive],
       pole: [promotion.getPole, Validators.required]
    });
  }

  onSavePromotion() {
    if (this.promotionForm.invalid) {
      return;
    }
    this.promotion ? this.updatePromotion() : this.addPromotion();
  }

  addPromotion() {
    this.promotionForm.value.promoSchedules = this.listPromoSchedules;
    this.promotionApiService.addPromotion(this.promotionForm.value).subscribe(
      () => {
        this.promotionForm = this.initAddForm();
        this.formCompleted.emit(true);
      },
      error => {
        console.error(error);
        this.errorRaised.emit(error);
      }
    );
  }

  updatePromotion() {
    this.promotionForm.value.promoSchedules = this.listPromoSchedules;
    this.promotionApiService
      .updatePromotion(this.promotionForm.value, this.promotion.getId)
      .subscribe(
        () => {
          this.initAddForm();
          this.formCompleted.emit(false);
        },
        error => {
          console.error(error);
          this.errorRaised.emit(error);
        }
      );
  }
}
