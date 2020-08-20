import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'

import { Routes, Directions, Stops, Information } from '../model/metro-model';

@Injectable({
  providedIn: 'root'
})
export class MetroService {

  constructor(private http: HttpClient) {}

  routes(): Observable<Routes[]> {
    return this.http.get<Routes[]>('/NexTrip/Routes');
  }

  directions(route: any): Observable<Directions[]> {
    return this.http.get<Directions[]>('/NexTrip/Directions/' + route)
  }

  stops(direction: any, route: any): Observable<Stops[]> {
    return this.http.get<Stops[]>('/NexTrip/Stops/' + route + '/' + direction)
  }

  information(route, direction, stop): Observable<Information[]> {
    return this.http.get<Information[]>('/NexTrip/' + route + '/' + direction + '/' + stop)
  }
}
