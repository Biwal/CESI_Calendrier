import {Component, OnInit, ViewChild} from '@angular/core';
import {AlertFormComponent} from '../../components/alert/alert-form/alert-form.component';
import {ClosureDaysApiService} from '../../services/api/closure-days-api.service';

@Component({
  selector: 'app-days-off',
  templateUrl: './days-off.component.html',
  styleUrls: ['./days-off.component.scss']
})
export class DaysOffComponent implements OnInit {
  @ViewChild(AlertFormComponent, { static: false })
  alertFormComponent: AlertFormComponent;

  listClosureDays: any[];
  private closureDayService: ClosureDaysApiService;

  constructor(closureDayService: ClosureDaysApiService) {
    this.listClosureDays = [];
    this.closureDayService = closureDayService;
    closureDayService.getClosureDays().subscribe((data) => {
      this.listClosureDays = data;
    });
  }

  ngOnInit() {
  }

  saveClosureDays() {
    this.closureDayService.updateClosureDays(this.listClosureDays).subscribe(
      () => {
        this.alertFormComponent.displayAlert('success', 'Les jours fermés ont bien été mis à jour');
      },
      error => {
        this.alertFormComponent.displayAlert('error', error);
      }
    );
  }
}
