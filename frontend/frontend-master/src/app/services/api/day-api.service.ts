import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DayApiService {
  constructor(private http: HttpClient) {}

  getDay() {
    return this.http
      .get(environment.apiUrl);
  }

}
