import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { ClosureDay } from '../../models/classes/closure-day';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ClosureDaysApiService {
  constructor(private http: HttpClient) {}

  getClosureDays() {
    return this.http
      .get(environment.apiUrl + 'closure_days').pipe(
        map((json: ClosureDay[]) => {
          return this.mapClosureDays(json);
        }));
  }

  updateClosureDays(closureDays: ClosureDay[]) {
    return this.http.put<ClosureDay[]>(
      environment.apiUrl + 'closure_days/update', {
        closuredays: closureDays
      }
    );
  }

  private mapClosureDays(json: ClosureDay[]): ClosureDay[] {
    return json.map<ClosureDay>(data => new ClosureDay(data));
  }
}
