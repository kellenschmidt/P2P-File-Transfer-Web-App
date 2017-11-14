import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class MapsService {

  // Google Maps Geolocation API key
  geolocationApiKey: string = 'AIzaSyA5Bc1HsGFvr_02WVl_H4V2kdDblCe38F4';

  constructor(private http: HttpClient) { }

  setReverseGeocode(lat: number, lon: number): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=' + this.geolocationApiKey);
  }

}
