import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {

  @Input('locationName') receiverLocation;

  constructor() { }

  ngOnInit() {
  }

}
