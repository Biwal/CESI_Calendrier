import { Component } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { AuthApiService } from '../../services/api/auth-api.service';
import { Subscription } from 'rxjs';
// the second parameter 'fr' is optional
registerLocaleData(localeFr, 'fr');

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  constructor(private authApiService: AuthApiService) {}

  logout() {
    this.authApiService.logout();
  }
}
