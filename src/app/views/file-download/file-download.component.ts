import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeerService } from '../../shared/api/peer.service';
import { MapsService } from '../../shared/api/maps.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '../../shared/api/location';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {
  url: string;
  currentLocation: Location;

  ngOnInit() {
    this.setGeoLocation();
    this.setReverseGeocode();
    this.requestConnection(this.url);
  }

  constructor(private router: Router, private route: ActivatedRoute, private peerService: PeerService, private mapsService: MapsService) {
    this.url = route.snapshot.url[0].path;
  }

  requestConnection(url: string) {
    // Request to connect by giving url and location object
    var connection = this.peerService.initConn(this.url, this.currentLocation);
  }

  setGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation.latitude = position.coords.latitude;
        this.currentLocation.longitude = position.coords.longitude;
      });
    } else {
      console.log("Could not acquire current location");
    }
  }

  setReverseGeocode() {
    this.mapsService.setReverseGeocode(this.currentLocation.latitude, this.currentLocation.longitude)
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
        this.currentLocation.city = addressComponents[i]['long_name'];
      }
      if (addressComponents[i]['types'][0] == 'administrative_area_level_1') {
        this.currentLocation.state = addressComponents[i]['long_name'];
      }
      if (addressComponents[i]['types'][0] == 'country') {
        this.currentLocation.country = addressComponents[i]['long_name'];
      }
    }
  }
}
