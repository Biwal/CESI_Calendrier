import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { Router } from "@angular/router";
import { HttpClient } from "@angular/common/http";
import { environment } from "src/environments/environment";

@Injectable({
  providedIn: "root"
})
export class AuthApiService {
  isAuth = new BehaviorSubject<boolean>(false);
  token: string;
  userId: string;
  userIntervenantId: string;

  constructor(private http: HttpClient, private router: Router) {}

  async login(username: string, password: string) {
    return new Promise((resolve, reject) => {
      this.http
        .post(environment.apiUrl + "login_check", {
          username,
          password
        })
        .subscribe(
          (authData: { token: string }) => {
            this.token = authData.token;
            window.sessionStorage.setItem("token", authData.token);
            this.isAuth.next(true);
            this.router.navigate([""]);
            resolve();
          },
          error => {
            reject(error);
          }
        );
    });
  }

  isAuthenticated() {
    return window.sessionStorage.getItem("token") != null;
  }

  logout() {
    window.sessionStorage.clear();
    this.isAuth.next(false);
    this.token = null;
    this.router.navigate(["/auth"]);
  }
}
