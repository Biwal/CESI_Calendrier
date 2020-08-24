import {AfterViewInit, Component, Input, NgModule, OnInit, ViewChild} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {AppComponent} from "../../app.component";
import {DayApiService} from "../../services/api/day-api.service";

@Component({
  selector: 'app-planning-day',
  templateUrl: './planning-day.component.html',
  styleUrls: ['./planning-day.component.scss']
})
export class PlanningDayComponent implements OnInit, AfterViewInit {

  @Input() date : Date;

  public debutPlanning = 8;
  public finPlanning = 18;

  jsonResponse = [{
    name: "Jupiter",
    crenneau: [
      {
        attribution: "AP18",
        heure_debut: 8,
        heure_fin: 12.5
      },
      {
        attribution: "AP18",
        heure_debut: 13.5,
        heure_fin: 17
      }
    ]},
    {
      name: "Bruh",
      crenneau: []
    },
    {
      name: "Tatoine",
      crenneau: [
        {
          attribution: "RRH",
          heure_debut: 10,
          heure_fin: 12
        },
        {
          attribution: "RRH",
          heure_debut: 14,
          heure_fin: 16
        }
      ]},
    {
      name: "Kingston",
      crenneau: [
        {
          attribution: "RILA19",
          heure_debut: 9,
          heure_fin: 11
        },
        {
          attribution: "evenement",
          heure_debut: 12,
          heure_fin: 14
        },
        {
          attribution: "RILA19",
          heure_debut: 14,
          heure_fin: 15
        }
      ]}
];
  // jsonResponse = [];

  constructor(private dayApiService: DayApiService) { }

  ngOnInit() {
    // this.dayApiService.getDay();
    //todo: source jsonResponse API
    this.jsonResponse.forEach( e => {
      // this.addRoomPlann(e);
    })
  }

  ngAfterViewInit(){
  }

  getPlages(jsonRoom) {
    let plages = [];
    let index = 8;
    jsonRoom.crenneau.forEach( e => {
      if (index < e.heure_debut) {
        plages.push({
          attribution: "vide",
          during: (e.heure_debut - index) * 2
        });
      }

      plages.push({
        attribution: e.attribution,
        during: (e.heure_fin - e.heure_debut) * 2
      });

      index = e.heure_fin;
    });
    if (index < 18) {
      plages.push({
        attribution: "vide",
        during: (18 - index) * 2
      });
    }
    return plages;
  }

  getDemiHeures() {
    let demiH = [];
    let nbPlage = (this.finPlanning - this.debutPlanning -1) * 2;
    let index = this.debutPlanning;
    while (index<nbPlage){
      demiH.push({heure:index});
      index+=0.5;
    }
    return demiH;
  }

  test() {
    this.jsonResponse = this.jsonResponse.slice(0, this.jsonResponse.length-2);
  }
}
