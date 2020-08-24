import {
  Component,
  Input,
  OnDestroy,
  Output,
  EventEmitter
} from '@angular/core';
import { Room } from 'src/app/models/classes/room';
import { RoomApiService } from 'src/app/services/api/room-api.service';
import { PromotionApiService } from 'src/app/services/api/promotion-api.service';
import { PoleApiService } from 'src/app/services/api/pole-api.service';
import { Promotion } from 'src/app/models/classes/promotion';
import { Pole } from 'src/app/models/classes/pole';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-btn-gestion-delete',
  templateUrl: './btn-gestion-delete.component.html',
  styleUrls: ['./btn-gestion-delete.component.scss']
})
export class BtnGestionDeleteComponent implements OnDestroy {
  @Input() dbObject: any;
  subscription: Subscription;
  @Output() isDeleted = new EventEmitter<boolean>();
  @Output() errorRaised = new EventEmitter<any>();


  constructor(
    private roomApiService: RoomApiService,
    private promotionApiService: PromotionApiService,
    private poleApiService: PoleApiService
  ) {}

  async deleteElement() {
    if (this.dbObject) {
      const id = this.dbObject.id;
      if (this.dbObject instanceof Room) {
        this.subscription = this.roomApiService.deleteRoom(id).subscribe(
          () => {
            this.isDeleted.emit(true);
          },
          error => {
            this.errorRaised.emit(error);
            console.error(error);
          }
        );
      } else if (this.dbObject instanceof Promotion) {
        this.subscription = this.promotionApiService
          .deletePromotion(id)
          .subscribe(
            () => {
              this.isDeleted.emit(true);
            },
            error => {
              this.errorRaised.emit(error);
              console.error(error);
            }
          );
      } else if (this.dbObject instanceof Pole) {
        this.subscription = this.poleApiService.deletePole(id).subscribe(
          () => {
            this.isDeleted.emit(true);
          },
          error => {
            this.errorRaised.emit(error);
            console.error(error);
          }
      );
      }
    }
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
