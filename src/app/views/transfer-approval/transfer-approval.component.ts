import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {

  @Input('locationName') receiverLocation;
  @Output('approval') approved = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  sendApproval(isApproved: boolean) {
    this.approved.emit(isApproved);
  }

}
