import {
  Component,
  ViewChild,
  Input,
  AfterContentInit,
  Output,
  EventEmitter
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoleApiService } from 'src/app/services/api/pole-api.service';
import { FormCptNameComponent } from 'src/app/components/forms/form-cpt-name/form-cpt-name.component';
import { FormCptColorComponent } from 'src/app/components/forms/form-cpt-color/form-cpt-color.component';
import { Pole } from 'src/app/models/classes/pole';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-pole',
  templateUrl: './form-pole.component.html',
  styleUrls: ['./form-pole.component.scss']
})
export class FormPoleComponent implements AfterContentInit {
  @ViewChild(FormCptNameComponent, { static: false })
  formCptNameComponent: FormCptNameComponent;
  @ViewChild(FormCptColorComponent, { static: false })
  formCptColorComponent: FormCptColorComponent;
  @Input() pole: Pole;
  poleForm: FormGroup;
  @Output() formSubmitted = new EventEmitter<boolean>();
  @Output() errorRaised = new EventEmitter<any>();

  constructor(
    private fb: FormBuilder,
    private poleApiService: PoleApiService,
    private router: Router
  ) {}

  ngAfterContentInit() {
    this.poleForm = this.pole
      ? this.initUpdateForm(this.pole)
      : this.initAddForm();
  }

  initAddForm(): FormGroup {
    return this.fb.group({
      name: ['', Validators.required],
      color: [
        '',
        Validators.compose([
          Validators.pattern(
            // récupération de couleur en exadécimal, rgb et rgba
            // tslint:disable-next-line:max-line-length
            '^#[a-f0-9]{6}$|^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$'
          ),
          Validators.required
        ])
      ]
    });
  }

  initUpdateForm(pole: Pole) {
    return this.fb.group({
      name: [pole.getName, Validators.required],
      color: [
        pole.getColor,
        Validators.compose([
          Validators.pattern(
            // tslint:disable-next-line:max-line-length
            '^#[a-f0-9]{6}$|^rgba?\\(((25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,\\s*?){2}(25[0-5]|2[0-4]\\d|1\\d{1,2}|\\d\\d?)\\s*,?\\s*([01]\\.?\\d*?)?\\)$'
          ),
          Validators.required
        ])
      ]
    });
  }

  onSavePole() {
    if (this.poleForm.invalid) {
      return;
    }
    this.pole ? this.updatePole() : this.addPole();
    this.router.navigate(['/polepage']);
  }

  addPole() {
    this.poleApiService.addPole(this.poleForm.value).subscribe(
      () => {
        this.poleForm = this.initAddForm();
        this.formSubmitted.emit(true);
      },
      error => {
        console.error(error);
        this.errorRaised.emit(error);
      }
    );
  }

  updatePole() {
    this.poleApiService
      .updatePole(this.poleForm.value, this.pole.getId)
      .subscribe(
        () => {
          this.initUpdateForm(this.pole);
          this.formSubmitted.emit(false);
        },
        error => {
          console.error(error);
          this.errorRaised.emit(error);
        }
      );
  }
}
