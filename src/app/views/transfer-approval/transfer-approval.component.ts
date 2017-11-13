import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {

  @Input('locationName') receiverLocation;
  @Output('approval') approved = new EventEmitter<boolean>();

  lat: number = 51.678418;
  lon: number = 7.809007;

  constructor() { }

  setLocation() {
    if(navigator.geolocation){
      console.log(navigator.geolocation.getCurrentPosition(this.setLocation.bind(this));
    }
  }

  setLocation(position: any) {
    this.lat = position.coords.latitude;
    this.lon = position.coords.longitude;
  }

  // TODO(Kellen): Get city name from lat and lon
  getReverseGeocode() {
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=AIzaSyA5Bc1HsGFvr_02WVl_H4V2kdDblCe38F4
  }

  ngOnInit() {
  }

  sendApproval(isApproved: boolean) {
    this.approved.emit(isApproved);
  }

}
