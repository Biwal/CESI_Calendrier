import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormPoleComponent} from './forms/form-pole/form-pole.component';
import {FormCptNameComponent} from './components/forms/form-cpt-name/form-cpt-name.component';
import {FormCptColorComponent} from './components/forms/form-cpt-color/form-cpt-color.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {FormCptCapacityComponent} from './components/forms/form-cpt-capacity/form-cpt-capacity.component';
import {FormRoomComponent} from './forms/form-room/form-room.component';
import {FormCptRoomComponent} from './components/forms/form-cpt-room/form-cpt-room.component';
import {FormCptPoleComponent} from './components/forms/form-cpt-pole/form-cpt-pole.component';
import {FormCptSizeComponent} from './components/forms/form-cpt-size/form-cpt-size.component';
import {FormCptActiveComponent} from './components/forms/form-cpt-active/form-cpt-active.component';
import {FormPromotionComponent} from './forms/form-promotion/form-promotion.component';
import {AuthInterceptor} from './models/interceptors/auth-interceptors';
import {JwtInterceptor} from './models/interceptors/jwt-interceptors';
import {FormCptUsernameComponent} from './components/forms/form-cpt-username/form-cpt-username.component';
import {FormCptPasswordComponent} from './components/forms/form-cpt-password/form-cpt-password.component';
import {FormAuthComponent} from './forms/form-auth/form-auth.component';
import {FormCptIsPrivateComponent} from './components/forms/form-cpt-is-private/form-cpt-is-private.component';
import {HeaderComponent} from './components/header/header.component';
import {PlanningDayComponent} from './components/planning_day/planning-day.component';
import {TabComponent} from './components/tab/tab.component';
import {PromoListComponent} from './components/list/promo-list/promo-list.component';
import {RoomListComponent} from './components/list/room-list/room-list.component';
import {PoleListComponent} from './components/list/pole-list/pole-list.component';
import {PlanningComponent} from './components/planning/planning.component';
import {PagePoleComponent} from './pages/page-pole/page-pole.component';
import {PagePromotionComponent} from './pages/page-promotion/page-promotion.component';
import {PageRoomComponent} from './pages/page-room/page-room.component';
import {FormCptPromotionComponent} from './components/forms/form-cpt-promotion/form-cpt-promotion.component';
import {NgSelectModule} from '@ng-select/ng-select';
import {BtnGestionAddComponent} from './components/buttons/btn-gestion-add/btn-gestion-add.component';
import {BtnGestionDeleteComponent} from './components/buttons/btn-gestion-delete/btn-gestion-delete.component';
import {FormCptDateStartComponent} from './components/forms/form-cpt-date-start/form-cpt-date-start.component';
import {FormCptDateEndComponent} from './components/forms/form-cpt-date-end/form-cpt-date-end.component';
import {FormReservationComponent} from './forms/form-reservation/form-reservation.component';
import {NavbarFormReservationComponent} from './components/navbars/navbar-form-reservation/navbar-form-reservation.component';
import {ModalComponent} from './components/modal/modal.component';
import {ModalReservationEventComponent} from './pages/modal-reservation-event/modal-reservation-event.component';
import {FormCptOnePromotionComponent} from './components/forms/form-cpt-one-promotion/form-cpt-one-promotion.component';
import {FormEventComponent} from './forms/form-event/form-event.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwnCalendarDayComponent} from './components/own-calendar/own-calendar-day/own-calendar-day.component';
import {OwnCalendarBackOfficeComponent} from './pages/backend/own-calendar-back-office/own-calendar-back-office.component';
import {OwnCalendarWeekComponent} from './components/own-calendar/own-calendar-week/own-calendar-week.component';
import {DatepickerDayComponent} from './components/datepicker/datepicker-day/datepicker-day.component';
import {DatepickerWeekComponent} from './components/datepicker/datepicker-week/datepicker-week.component';
import {OwnCalendarFrontOfficeComponent} from './pages/frontend/own-calendar-front-office/own-calendar-front-office.component';
import {DaysOffComponent} from './pages/days-off/days-off.component';
import {AlertFormComponent} from './components/alert/alert-form/alert-form.component';
import {DatepickerPromotionComponent} from './components/datepicker-promotion/datepicker-promotion.component';
import {DatePickerDaysOffComponent} from './components/date-picker-days-off/date-picker-days-off.component';
import {ModalUpdateEventComponent} from './pages/modal-update-event/modal-update-event.component';
import {ModalCheckComponent} from './components/modal/modal-check/modal-check.component';
import {PageParametersComponent} from './pages/page-parameters/page-parameters.component';
import {OwnCalendarFrontOfficeWeekComponent} from './pages/frontend/own-calendar-front-office-week/own-calendar-front-office-week.component';
import {OwnDateTimePickerComponent} from './components/own-date-time-picker/own-date-time-picker.component';
import {OwnDatePickerInputDirective} from './directives/own-date-picker-input/own-date-picker-input.directive';
import {FormConfigComponent} from './forms/form-config/form-config.component';
import {FormPasswordComponent} from './forms/form-password/form-password.component';
import {ColorPickerModule} from 'ngx-color-picker';
import {ModalPermuFusionComponent} from "./pages/modal-permu-fusion/modal-permu-fusion.component";

@NgModule({
  declarations: [
    AppComponent,
    FormPoleComponent,
    FormCptNameComponent,
    FormCptColorComponent,
    FormCptCapacityComponent,
    FormRoomComponent,
    FormCptRoomComponent,
    FormCptPoleComponent,
    FormCptSizeComponent,
    FormCptActiveComponent,
    FormPromotionComponent,
    FormCptUsernameComponent,
    FormCptPasswordComponent,
    FormAuthComponent,
    FormCptIsPrivateComponent,
    HeaderComponent,
    PlanningDayComponent,
    TabComponent,
    PromoListComponent,
    RoomListComponent,
    PoleListComponent,
    PlanningComponent,
    PagePoleComponent,
    PagePromotionComponent,
    PageRoomComponent,
    FormCptPromotionComponent,
    BtnGestionDeleteComponent,
    BtnGestionAddComponent,
    FormCptDateStartComponent,
    FormCptDateEndComponent,
    FormReservationComponent,
    NavbarFormReservationComponent,
    ModalComponent,
    ModalReservationEventComponent,
    FormCptOnePromotionComponent,
    FormEventComponent,
    OwnCalendarBackOfficeComponent,
    OwnCalendarDayComponent,
    OwnCalendarWeekComponent,
    DatepickerDayComponent,
    DatepickerWeekComponent,
    OwnCalendarFrontOfficeComponent,
    DaysOffComponent,
    AlertFormComponent,
    DatepickerPromotionComponent,
    DatePickerDaysOffComponent,
    ModalUpdateEventComponent,
    ModalCheckComponent,
    PageParametersComponent,
    OwnCalendarFrontOfficeWeekComponent,
    OwnDatePickerInputDirective,
    OwnDateTimePickerComponent,
    FormConfigComponent,
    FormPasswordComponent,
    ModalPermuFusionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgSelectModule,
    FormsModule,
    BrowserAnimationsModule,
    ColorPickerModule,

  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true},
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalReservationEventComponent, ModalCheckComponent, ModalPermuFusionComponent]
})
export class AppModule {
}
