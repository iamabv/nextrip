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
  zoom: number = 8;

  constructor(private metroService: MetroService) { }

  ngOnInit(): void {
    // call routes api on component load
    this.metroService.routes()
      .subscribe(data => this.routes = data);
  }

  // Modify the route
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

  // Call directions api after selecting the route
  selectRoute(route: any) {
    this.metroService.directions(route)
        .subscribe(data => this.directions = data);
  }

  // Call stops api after selecting the direction
  selectDirection(direction: any, route: any) {
    route = this.selectedRoute;
    this.metroService.stops(direction, route)
      .subscribe(data => this.stops = data);
  }

  // Call information api after selecting the stop and show map
  selectStop(stop:any) {
    this.selectedStop = stop;
    this.unavailableInfo = false;

    this.metroService.information(this.selectedRoute, this.selectedDirection, this.selectedStop)
      .subscribe(
        data => {
          if (data.length > 1) {
            this.information = data;

            // Set latitude and longitude for maps
            if(data[0].VehicleLatitude && data[0].VehicleLongitude) {
                this.latitude = data[0].VehicleLatitude;
                this.longitude = data[0].VehicleLongitude;
                this.zoom = 16;
            }
          }
          else {
            this.unavailableInfo = true;
            this.information = [];
          }
        }
      )
  }

}
