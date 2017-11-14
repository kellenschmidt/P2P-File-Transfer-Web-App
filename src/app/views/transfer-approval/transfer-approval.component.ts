import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { MapsService } from '../../shared/api/maps.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {
  
  @Output('approval') approved = new EventEmitter<boolean>();
  @Input('city') currentCity: string;
  @Input('state') currentState: string;
  @Input('country') currentCountry: string;
  @Input('latitude') lat: string;
  @Input('longitude') lon: string;

  constructor() { }
  
  ngOnInit() {}

  sendApproval(isApproved: boolean) {
    this.approved.emit(isApproved);
  }

}
