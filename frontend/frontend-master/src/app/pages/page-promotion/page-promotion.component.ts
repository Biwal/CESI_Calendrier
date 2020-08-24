import { Component, ViewChild } from '@angular/core';
import { FormPromotionComponent } from '../../forms/form-promotion/form-promotion.component';
import { PromoListComponent } from 'src/app/components/list/promo-list/promo-list.component';
import { BtnGestionDeleteComponent } from 'src/app/components/buttons/btn-gestion-delete/btn-gestion-delete.component';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';

@Component({
  selector: 'app-page-promotion',
  templateUrl: './page-promotion.component.html',
  styleUrls: ['./page-promotion.component.scss']
})
export class PagePromotionComponent {
  @ViewChild(FormPromotionComponent, { static: false })
  formPromoComponent: FormPromotionComponent;
  @ViewChild(PromoListComponent, { static: false })
  promoListComponent: PromoListComponent;
  @ViewChild(BtnGestionDeleteComponent, { static: false })
  btnGestionDeleteComponent: BtnGestionDeleteComponent;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;

  onUpdateForm(valueSelectPromo?) {
    this.formPromoComponent.promotion = valueSelectPromo;
    this.formPromoComponent.ngAfterContentInit();
    this.btnGestionDeleteComponent.dbObject = valueSelectPromo;

  }

  onReloadComponent() {
    this.promoListComponent.getPromosList();
  }

  displaySuccessAlert(wasAdded: boolean, message?: string) {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', message ? message : wasAdded ? 'La promotion a été ajoutée' : 'La promotion a été modifiée');
    this.onReloadComponent();
    this.onUpdateForm();
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.statusText);
  }
}
