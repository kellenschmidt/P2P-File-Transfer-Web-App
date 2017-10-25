import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-transfer-approval',
  templateUrl: './transfer-approval.component.html',
  styleUrls: ['./transfer-approval.component.scss']
})
export class TransferApprovalComponent implements OnInit {

  receiverLocation = 'Dallas, TX';

  constructor() { }

  ngOnInit() {
  }

}
