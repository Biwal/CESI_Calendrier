import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {Config} from '../../../models/classes/config';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  constructor(private http: HttpClient) {}

  getConfig() {
    return this.http
      .get<Config>(environment.apiUrl + 'configs/1');
  }

  updateConfig(config: Config) {
    return this.http
        .put<Config>(environment.apiUrl + 'configs/1', config);
  }

  addConfig(config: Config) {
    return this.http.post<Config>(environment.apiUrl + 'configs', config);
  }
}
