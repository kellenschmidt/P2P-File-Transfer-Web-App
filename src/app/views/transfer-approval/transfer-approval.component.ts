import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MapsService } from '../../shared/api/maps.service'

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {
  
  @Output('approval') approved = new EventEmitter<boolean>();

  lat: number = 51.678418;
  lon: number = 7.809007;
  receiverLocation: string;

  constructor(private mapsService: MapsService) { }

  setLocation() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition((position) => {
        this.lat = position.coords.latitude;
        this.lon = position.coords.longitude;
        console.log("Location: " + this.lat + ", " + this.lon);
      });
    } else {
      console.log("Could not acquire current location");
    }
  }

  // TODO(Kellen): Get city name from lat and lon
  setReverseGeocode() {
    this.receiverLocation = this.mapsService.getCurrentCity() + ", " + this.mapsService.getCurrentState() + ", " + this.mapsService.getCurrentCountry();
  }

  ngOnInit() {
  }

  sendApproval(isApproved: boolean) {
    this.approved.emit(isApproved);
  }

}
