import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeerService } from '../../shared/api/peer.service';
import { MapsService } from '../../shared/api/maps.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {
  url: string;
  lat: number;
  lon: number;
  currentCity: string;
  currentState: string;
  currentCountry: string;

  ngOnInit() {
    this.setGeoLocation();
    this.setReverseGeocode();
    this.requestConnection(this.url);
  }

  constructor(private router: Router, private route: ActivatedRoute, private peerService: PeerService, private mapsService: MapsService) {
    this.url = route.snapshot.url[0].path;
  }

  requestConnection(url: string) {
    // Build JSON location object
    let loc = {
      "City": this.currentCity,
      "State": this.currentState,
      "Country": this.currentCountry,
      "lat": this.lat,
      "long": this.lon
    }
    // Request to connect by giving url and location object
    var connection = this.peerService.initConn(this.url, loc);
  }

  setGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
      });
    } else {
      console.log("Could not acquire current location");
    }
  }

  setReverseGeocode() {
    this.mapsService.setReverseGeocode(this.lat, this.lon)
      .subscribe(
      (data) => {
        let addressComponents: any[] = data['results'][0]['address_components'];
        this.setLocationText(addressComponents);
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

  setLocationText(addressComponents: any[]) {
    for (let i = 0; i < addressComponents.length; i++) {
      if (addressComponents[i]['types'][0] == 'locality') {
        this.currentCity = addressComponents[i]['long_name'];
      }
      if (addressComponents[i]['types'][0] == 'administrative_area_level_1') {
        this.currentState = addressComponents[i]['long_name'];
      }
      if (addressComponents[i]['types'][0] == 'country') {
        this.currentCountry = addressComponents[i]['long_name'];
      }
    }
  }
}
