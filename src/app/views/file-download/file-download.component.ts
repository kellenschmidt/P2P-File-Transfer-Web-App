import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { PeerService } from '../../shared/api/peer.service';
import { MapsService } from '../../shared/api/maps.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Location } from '../../shared/api/location';
import { Observable } from 'rxjs/Rx';

@Component({
  selector: 'app-file-download',
  templateUrl: './file-download.component.html',
  styleUrls: ['./file-download.component.scss']
})
export class FileDownloadComponent implements OnInit {
  url: string;
  currentLocation: Location;
  connection: any;

  ngOnInit() {
    this.setGeoLocation();
  }

  constructor(private router: Router, private route: ActivatedRoute, private peerService: PeerService, private mapsService: MapsService) {
    this.url = route.snapshot.url[0].path;
    this.requestConnection();
  }

  requestConnection() {
    // Request to connect by giving url and location object
    setTimeout(() => {
      this.peerService.initConn(this.url, this.currentLocation);
    }, 1000);
    setTimeout(() => {
      this.connection = this.peerService.getConnection();
      console.log("Connection", this.connection);
      this.connection.on('data', function (data) {
        console.log(data);
        this.downloadfile(data);
      })
    }, 2000);
  }

  downloadFile(data: Response) {
    var blob = new Blob([data], { type: 'application/octet-stream' });
    var url = window.URL.createObjectURL(blob);
    window.open(url);
  }

  setGeoLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.currentLocation = new Location(position.coords.latitude, position.coords.longitude, "Anytown", "Mystate", "USA");
        this.setReverseGeocode();
      });
    } else {
      console.log("Could not acquire current location");
      this.currentLocation = new Location(0, 0, "Err", "Err", "Err");
    }
  }

  setReverseGeocode() {
    console.log(this.currentLocation.latitude, this.currentLocation.longitude);
    this.mapsService.setReverseGeocode(this.currentLocation.latitude, this.currentLocation.longitude)
      .subscribe(
      (data) => {
        // There isn't any error catching here - if google doesn't give us a response we don't handle anything
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
