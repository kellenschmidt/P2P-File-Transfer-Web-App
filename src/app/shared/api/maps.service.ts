import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Injectable()
export class MapsService {

  // Google Maps Geolocation API key
  geolocationApiKey: string = 'AIzaSyA5Bc1HsGFvr_02WVl_H4V2kdDblCe38F4';
  currentCity: string;
  currentState: string;
  currentCountry: string;

  constructor(private http: HttpClient) { }

  getReverseGeocode(lat: number, lon: number) {
    this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + lat + ',' + lon + '&key=' + this.geolocationApiKey)
    .subscribe(
      (data) => {
        this.currentCity = data['results'][0]['address_components'][4]['long_name'];
        this.currentState = data['results'][0]['address_components'][6]['long_name'];
        this.currentCountry = data['results'][0]['address_components'][7]['long_name'];
      },
      (err: HttpErrorResponse) => {
        if (err.error instanceof Error) {
          // A client-side or network error occurred. Handle it accordingly.
          console.log('An error occurred:', err.error.message);
        } else {
          // The backend returned an unsuccessful response code.
          // The response body may contain clues as to what went wrong,
          console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
        }
      }  
    );
  }

  getCurrentCity(): string {
    return this.currentCity;
  }

  getCurrentState(): string {
    return this.currentState;
  }

  getCurrentCountry(): string {
    return this.currentCountry;
  }

}
