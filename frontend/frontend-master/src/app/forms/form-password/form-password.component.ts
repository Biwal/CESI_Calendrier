import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Config} from '../../models/classes/config';
import {AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ConfigService} from '../../services/api/config/config.service';
import {Router} from '@angular/router';
import {UserService} from '../../services/api/user.service';

@Component({
  selector: 'app-form-password',
  templateUrl: './form-password.component.html',
  styleUrls: ['./form-password.component.scss']
})
export class FormPasswordComponent implements OnInit, AfterContentInit {
    @Input() config: Config;
    passwordForm: FormGroup;
    @Output() formSubmitted = new EventEmitter<any>();
    @Output() errorRaised = new EventEmitter<any>();

    constructor(private fb: FormBuilder, private userService: UserService, private router: Router) { }

    ngOnInit() {
    }

    ngAfterContentInit() {
        this.passwordForm = this.initForm();
    }

    initForm(): FormGroup {
        return this.fb.group({
            password: [
                '',
                Validators.required
            ],
            repeatPassword: [
                '', [
                    Validators.required,
                    this.matchValues('password')
                ]
            ],
        });
    }

    updatePassword() {
        this.userService.updatePassword(window.btoa(this.passwordForm.controls.password.value)).subscribe((data) => {
            this.formSubmitted.emit(true);
        },
    error => {
            this.errorRaised.emit(error);
        });
    }

    onSavePassword() {
        if (this.passwordForm.invalid) {
            return;
        }
        this.updatePassword();
    }

    private matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
        return (control: AbstractControl): ValidationErrors | null => {
            return !!control.parent &&
            !!control.parent.value &&
            control.value === control.parent.controls[matchTo].value
                ? null
                : { isMatching: false };
        };
    }
}
