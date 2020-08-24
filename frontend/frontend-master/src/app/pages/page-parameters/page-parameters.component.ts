import {Component, OnInit, ViewChild} from '@angular/core';
import {Config} from '../../models/classes/config';
import {ConfigService} from '../../services/api/config/config.service';
import {AlertFormComponent} from '../../components/alert/alert-form/alert-form.component';
import {FormConfigComponent} from '../../forms/form-config/form-config.component';

@Component({
  selector: 'app-page-parameters',
  templateUrl: './page-parameters.component.html',
  styleUrls: ['./page-parameters.component.scss']
})
export class PageParametersComponent implements OnInit {
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;
  @ViewChild(FormConfigComponent, { static: true })
  formConfigComponent: FormConfigComponent;
  config: any;

  constructor(configService: ConfigService) {
    configService.getConfig().subscribe((data: Config) => {
      this.config = new Config(data);
      this.formConfigComponent.config = new Config(data);
      this.formConfigComponent.ngAfterContentInit();
    });
  }

  ngOnInit() {
  }

  displaySuccessAlert() {
    this.alertFormComponent.displayAlert('success', 'Les paramètres ont bien été définis');
  }

  displayFailAlert(error) {
    this.alertFormComponent.displayAlert('error', error.statusText);
  }
}
