import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { Pole } from 'src/app/models/classes/pole';
import { PoleApiService } from 'src/app/services/api/pole-api.service';

@Component({
  selector: 'app-form-cpt-pole',
  templateUrl: './form-cpt-pole.component.html',
  styleUrls: ['./form-cpt-pole.component.scss']
})
export class FormCptPoleComponent implements OnInit {
  @Input() parentForm: FormGroup;
  polesList$: Observable<Pole[]>;

  constructor(private poleApiService: PoleApiService) {}

  ngOnInit() {
    this.polesList$ = this.poleApiService.getPoles();
  }

  compareFn(optOne, optTwo) {
    return optOne.getName === optTwo.getName;
  }
}
