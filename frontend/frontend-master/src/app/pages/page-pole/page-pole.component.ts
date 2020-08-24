import { Component, ViewChild } from '@angular/core';
import { FormPoleComponent } from '../../forms/form-pole/form-pole.component';
import { PoleListComponent } from 'src/app/components/list/pole-list/pole-list.component';
import { BtnGestionDeleteComponent } from 'src/app/components/buttons/btn-gestion-delete/btn-gestion-delete.component';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';

@Component({
  selector: 'app-page-pole',
  templateUrl: './page-pole.component.html',
  styleUrls: ['./page-pole.component.scss']
})
export class PagePoleComponent {
  @ViewChild(FormPoleComponent, { static: false })
  formPoleComponent: FormPoleComponent;
  @ViewChild(PoleListComponent, { static: false })
  poleListComponent: PoleListComponent;
  @ViewChild(BtnGestionDeleteComponent, { static: false })
  btnGestionDeleteComponent: BtnGestionDeleteComponent;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;

  onUpdateForm(valueSelectPole?) {
    this.formPoleComponent.pole = valueSelectPole;
    this.formPoleComponent.ngAfterContentInit();
    this.btnGestionDeleteComponent.dbObject = valueSelectPole;
  }

  onReloadComponent() {
    this.poleListComponent.getPolesList();
  }

  displaySuccessAlert(wasAdded: boolean, message?: string) {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', message ? message : wasAdded ? 'Le pôle a été ajouté' : 'Le pôle a été modifié');
    this.onUpdateForm();
    this.onReloadComponent();
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.statusText);
  }
}
