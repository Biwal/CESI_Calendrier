import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormAuthComponent } from './forms/form-auth/form-auth.component';
import { PagePoleComponent } from './pages/page-pole/page-pole.component';
import { PagePromotionComponent } from './pages/page-promotion/page-promotion.component';
import { PageRoomComponent } from './pages/page-room/page-room.component';
import { AuthGuardService } from './services/auth-guard.service';
import { OwnCalendarBackOfficeComponent } from './pages/backend/own-calendar-back-office/own-calendar-back-office.component';
import {OwnCalendarFrontOfficeComponent} from './pages/frontend/own-calendar-front-office/own-calendar-front-office.component';
import {DaysOffComponent} from './pages/days-off/days-off.component';
import {PageParametersComponent} from './pages/page-parameters/page-parameters.component';
import {OwnCalendarFrontOfficeWeekComponent} from './pages/frontend/own-calendar-front-office-week/own-calendar-front-office-week.component';

const routes: Routes = [
  { path: '', component: PagePoleComponent },
  { path: 'auth', component: FormAuthComponent },
  {
    path: 'polepage',
    component: PagePoleComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'promopage',
    component: PagePromotionComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'frontend-day',
    component: OwnCalendarFrontOfficeComponent,
  },
  {
    path: 'frontend-week',
    component: OwnCalendarFrontOfficeWeekComponent,
  },
  {
    path: 'roompage',
    component: PageRoomComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'daysoff',
    component: DaysOffComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'parameters',
    component: PageParametersComponent,
    canActivate: [AuthGuardService]
  },
  {
    path: 'planning', component: OwnCalendarBackOfficeComponent,
    canActivate: [AuthGuardService]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      anchorScrolling: 'enabled',
      onSameUrlNavigation: 'reload',
      scrollPositionRestoration: 'enabled'
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
