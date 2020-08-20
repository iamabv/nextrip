import { Component, OnInit } from '@angular/core';
import { MetroService } from '../service/metro.service';
import { Routes, Directions, Stops, Information } from '../model/metro-model';

@Component({
  selector: 'app-metro-info',
  templateUrl: './metro-info.component.html',
  styleUrls: ['./metro-info.component.css']
})
export class MetroInfoComponent implements OnInit {

  routes: Routes[] = [];
  selectedRoute: number;

  directions: Directions[];
  selectedDirection: number;

  stops: Stops[];
  selectedStop: string;

  information: Information[];

  unavailableInfo: boolean = false;

  latitude: number;
  longitude; number;

  constructor(private metroService: MetroService) { }

  ngOnInit(): void {
    this.metroService.routes()
      .subscribe(data => this.routes = data);
  }

  changeRoute(changedRoute: any) {
    this.resetRoute();
    this.selectRoute(changedRoute);
  }

  resetRoute() {
    //reset unavailable info, selected direction and selected stop on changing the route
    this.unavailableInfo = false;
    this.selectedDirection = 0;
    this.selectedStop = "";

    //reset latitude and longitude
    this.latitude = 0;
    this.longitude = 0;
  }

  selectRoute(route: any) {
    this.metroService.directions(route)
        .subscribe(data => this.directions = data);
  }

  selectDirection(direction: any, route: any) {
    route = this.selectedRoute;
    this.metroService.stops(direction, route)
      .subscribe(data => this.stops = data);
  }

  selectStop(stop:any) {
    this.selectedStop = stop;
    this.unavailableInfo = false;

    this.metroService.information(this.selectedRoute, this.selectedDirection, this.selectedStop)
      .subscribe(
        data => {
          if (data.length > 1) {
            this.information = data;
          }
          else {
            this.unavailableInfo = true;
            this.information = [];
          }
        }
      )
  }

}
