import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import {EventInterface} from '../../components/own-calendar/own-calendar.component';
import {forkJoin} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  updatePassword(password: string) {
    return this.http.post<any>(environment.apiUrl + 'user/update-password', {
      password
    });
  }
}
