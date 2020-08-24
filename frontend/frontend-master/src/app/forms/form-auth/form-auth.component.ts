import { Component, OnInit, ViewChild } from "@angular/core";
import { FormCptUsernameComponent } from "src/app/components/forms/form-cpt-username/form-cpt-username.component";
import { FormCptPasswordComponent } from "src/app/components/forms/form-cpt-password/form-cpt-password.component";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { AuthApiService } from "src/app/services/api/auth-api.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-form-auth",
  templateUrl: "./form-auth.component.html",
  styleUrls: ["./form-auth.component.scss"]
})
export class FormAuthComponent implements OnInit {
  @ViewChild(FormCptUsernameComponent, { static: false })
  formCptUsernameComponent: FormCptUsernameComponent;
  @ViewChild(FormCptPasswordComponent, { static: false })
  formCptPasswordComponent: FormCptPasswordComponent;
  authForm: FormGroup;
  nolog = '';


  constructor(
    private fb: FormBuilder,
    private authApiService: AuthApiService,
    private router: Router
  ) {}

  ngOnInit() {
    this.authForm = this.initLoginForm();
  }

  initLoginForm(): FormGroup {
    return this.fb.group({
      username: ["", Validators.required],
      password: ["", Validators.required]
    });
  }

  onLogin() {
    this.authApiService
      .login(
        this.authForm.controls.username.value,
        this.authForm.controls.password.value
      )
      .then(() => {
        sessionStorage.setItem("user", this.authForm.controls.username.value);
        this.router.navigate(['/polepage']);
      })
      .catch(error => {
        console.error(error);
        if (error.status === 401) {
          this.nolog = 'Identifiant ou Mot de passe invalide';
        }
      });
  }
}

