import { TestBed, getTestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { MetroService } from './metro.service';

describe('MetroService', () => {

  let injector: TestBed;
  let service: MetroService;
  let httpMock: HttpTestingController;

  const routesResponse = [
    { "Description": "METRO Blue Line","ProviderID": "8","Route": "901" },
    { "Description": "METRO Green Line","ProviderID": "8","Route": "902" },
    { "Description": "METRO Red Line","ProviderID": "9","Route": "903" }
  ];

  const directionsResponse = [
    {"Text":"NORTHBOUND","Value":"4"},
    {"Text":"SOUTHBOUND","Value":"1"}
  ];

  const stopsResponse = [
    {"Text":"Mall of America Station","Value":"MAAM"},
    {"Text":"28th Ave Station","Value":"28AV"},
    {"Text":"Bloomington Central Station","Value":"BLCT"}
  ];

  const infoResponse = [
    {"Actual":true,"BlockNumber":87,"DepartureText":"13 Min","DepartureTime":"\/Date(1597853880000-0500)\/","Description":"to Mpls-Target Field","Gate":"1","Route":"Blue","RouteDirection":"NORTHBOUND","Terminal":"","VehicleHeading":0,"VehicleLatitude":44.854571,"VehicleLongitude":-93.238836},
    {"Actual":false,"BlockNumber":89,"DepartureText":"11:33","DepartureTime":"\/Date(1597854780000-0500)\/","Description":"to Mpls-Target Field","Gate":"1","Route":"Blue","RouteDirection":"NORTHBOUND","Terminal":"","VehicleHeading":0,"VehicleLatitude":0,"VehicleLongitude":0},
    {"Actual":false,"BlockNumber":91,"DepartureText":"11:48","DepartureTime":"\/Date(1597855680000-0500)\/","Description":"to Mpls-Target Field","Gate":"1","Route":"Blue","RouteDirection":"NORTHBOUND","Terminal":"","VehicleHeading":0,"VehicleLatitude":0,"VehicleLongitude":0}
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ MetroService ],
    });

    injector = getTestBed();
    service = injector.get(MetroService);
    httpMock = injector.get(HttpTestingController);
  });

  it('should be created', () => {
    const service: MetroService = TestBed.get(MetroService);
    expect(service).toBeTruthy();
  });

  it('routes() should return data', () => {
    service.routes().subscribe((res) => {
      expect(res.length).toBe(3);
      expect(res).toEqual(routesResponse);
    });

    const req = httpMock.expectOne('/NexTrip/Routes');
    expect(req.request.method).toBe('GET');
    req.flush(routesResponse);
  });

  it('directions() should return data', () => {
    let route = "901";
    service.directions(route).subscribe((res) => {
      expect(res.length).toBe(2);
      expect(res).toEqual(directionsResponse);
    });

    const req = httpMock.expectOne('/NexTrip/Directions/' + route);
    expect(req.request.method).toBe('GET');
    req.flush(directionsResponse);
  });

  it('stops() should return data', () => {
    let route = "901";
    let direction = "4";
    service.stops(direction, route).subscribe((res) => {
      expect(res.length).toBe(3);
      expect(res).toEqual(stopsResponse);
    });

    const req = httpMock.expectOne('/NexTrip/Stops/' + route + '/' + direction);
    expect(req.request.method).toBe('GET');
    req.flush(stopsResponse);
  });

  it('information() should return data', () => {
    let route = "901";
    let direction = "4";
    let stop = "MAAM";
    service.information(route, direction, stop).subscribe((res) => {
      expect(res.length).toBe(3);
      expect(res).toEqual(infoResponse);
    });

    const req = httpMock.expectOne('/NexTrip/' + route + '/' + direction + '/' + stop);
    expect(req.request.method).toBe('GET');
    req.flush(infoResponse);
  });

  afterEach(() => {
    httpMock.verify();
  });
});
