import {AfterContentInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Config} from '../../models/classes/config';
import {Router} from '@angular/router';
import {ConfigService} from '../../services/api/config/config.service';

@Component({
  selector: 'app-form-config',
  templateUrl: './form-config.component.html',
  styleUrls: ['./form-config.component.scss']
})
export class FormConfigComponent implements OnInit, AfterContentInit {

  @Input() config: Config;
  configForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<any>();
  @Output() errorRaised = new EventEmitter<any>();
  constructor(private fb: FormBuilder, private configService: ConfigService, private router: Router) { }

  ngOnInit() {
  }

  ngAfterContentInit() {
    this.configForm = this.config
        ? this.initUpdateForm(this.config)
        : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      defaultEventColor: [
        '',
        Validators.compose([
          Validators.pattern(
              // tslint:disable-next-line:max-line-length
              '^#[a-f0-9]{6}$|^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$'
          ),
          Validators.required
        ])
      ],
      hourStart: [
          '', Validators.required
      ],
      hourEnd: [
          '', Validators.required
      ]
    });
  }

  initUpdateForm(config: Config) {
    return this.fb.group({
      defaultEventColor: [config.getDefaultEventColor, Validators.compose([
        Validators.pattern(
            // tslint:disable-next-line:max-line-length
            '^#[a-f0-9]{6}$|^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$'
        ),
        Validators.required
      ])],
      hourStart: [config.getHourStart, Validators.required],
      hourEnd: [config.getHourEnd, Validators.required],
    });
  }

  addConfig() {
    this.configService.addConfig(this.configForm.value).subscribe(
        () => {
          this.configForm = this.initAddForm();
          this.formSubmitted.emit(true);
        },
        error => {
          console.error(error);
          this.errorRaised.emit(error);
        }
    );
  }

  updateConfig() {
    this.configService
        .updateConfig(this.configForm.value)
        .subscribe(
            () => {
              this.initUpdateForm(this.config);
              this.formSubmitted.emit(false);
            },
            error => {
              console.error(error);
              this.errorRaised.emit(error);
            }
        );
  }

  onSaveConfig() {
    if (this.configForm.invalid) {
      console.log();
      return;
    }
    this.config ? this.updateConfig() : this.addConfig();
    this.router.navigate(['/parameters']);
  }
}
