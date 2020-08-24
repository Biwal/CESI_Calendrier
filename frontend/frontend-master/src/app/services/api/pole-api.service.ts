import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Pole } from 'src/app/models/classes/pole';
import { map } from 'rxjs/operators';
import { Promotion } from 'src/app/models/classes/promotion';

@Injectable({
  providedIn: 'root'
})
export class PoleApiService {
  constructor(private http: HttpClient) {}

  getPoles() {
    return this.http.get<Pole[]>(environment.apiUrl + 'poles').pipe<Pole[]>(
      map((json: Pole[]) => {
        return this.mapPoles(json);
      })
    );
  }

  mapPoles(json: Pole[]): Pole[] {
    const poles = json.map<Pole>(data => new Pole(data));
    poles.forEach(element => this.mapOnePole(element));
    return poles;
  }

  mapOnePole(pole: Pole) {
    pole.setPromotions(
      pole.getPromotions.map<Promotion>(data => new Promotion(data))
    );
  }

  getOnePole(id: number) {
    return this.http.get<Pole>(environment.apiUrl + 'poles/' + String(id)).pipe(
      map(json => {
        const pole = new Pole(json);
        return this.mapOnePole(pole);
      })
    );
  }

  addPole(pole: Pole) {
    return this.http.post<Pole>(environment.apiUrl + 'poles', pole);
  }

  updatePole(pole: Pole, id: number) {
    return this.http.put<Pole>(environment.apiUrl + 'poles/' + id, pole);
  }

  deletePole(id: number) {
    return this.http.delete<Pole>(environment.apiUrl + 'poles/' + id);
  }
}
