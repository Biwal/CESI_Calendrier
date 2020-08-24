import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthApiService } from './api/auth-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private auth: AuthApiService, private router: Router) {}

  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    return new Observable(observer => {
      this.auth.isAuth.subscribe(auth => {
        if (!auth && sessionStorage.getItem('token') === null) {
          window.sessionStorage.clear();
          this.router.navigate(['/auth']);
        }
        observer.next(true);
      });
    });
  }
}
