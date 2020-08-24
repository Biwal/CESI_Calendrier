import { Component, ViewChild } from '@angular/core';
import { FormRoomComponent } from '../../forms/form-room/form-room.component';
import { RoomListComponent } from 'src/app/components/list/room-list/room-list.component';
import { BtnGestionDeleteComponent } from 'src/app/components/buttons/btn-gestion-delete/btn-gestion-delete.component';
import { AlertFormComponent } from 'src/app/components/alert/alert-form/alert-form.component';

@Component({
  selector: 'app-page-room',
  templateUrl: './page-room.component.html',
  styleUrls: ['./page-room.component.scss']
})
export class PageRoomComponent {
  @ViewChild(FormRoomComponent, { static: false })
  formRoomComponent: FormRoomComponent;
  @ViewChild(RoomListComponent, { static: false })
  roomListComponent: RoomListComponent;
  @ViewChild(BtnGestionDeleteComponent, { static: false })
  btnGestionDeleteComponent: BtnGestionDeleteComponent;
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;

  onUpdateForm(valueSelectRoom?) {
    this.formRoomComponent.room = valueSelectRoom;
    this.formRoomComponent.ngAfterContentInit();
    this.btnGestionDeleteComponent.dbObject = valueSelectRoom;
  }

  onReloadComponent() {
    this.roomListComponent.getRoomsList();
  }

    displaySuccessAlert(wasAdded: boolean, message?: string) {
    // tslint:disable-next-line:max-line-length
    this.alertFormComponent.displayAlert('success', message ? message : wasAdded ? 'La salle a été ajoutée' : 'La salle a été modifiée');
    this.onReloadComponent();
    this.onUpdateForm();
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.statusText);
  }

}
