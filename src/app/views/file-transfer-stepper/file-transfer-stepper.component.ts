import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeerService } from '../../shared/api/peer.service';
import { Location } from '../../shared/api/location';

@Component({
  selector: 'app-file-transfer-stepper',
  templateUrl: './file-transfer-stepper.component.html',
  styleUrls: ['./file-transfer-stepper.component.scss']
})
export class FileTransferStepperComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  currentSize: number = 1100000;
  totalSize: number = 2200000;
  connectionUrl: string = '';
  peerId: any;
  receiverLocation: Location;
  @ViewChild('stepper') stepper;

  constructor(private _formBuilder: FormBuilder,
              private peerService: PeerService) { }

  getPeerId(){
		this.peerId = this.peerService.getPeerId();
	}

	createUrl(){
		this.connectionUrl = this.peerService.createUrl();
	}

  abbreviateFileSize(oldSize: number, base: number) {
    if(base < 1000) {
      return `${oldSize} bytes`;
    }
    else if(base < 1000000) {
      return `${oldSize/1000} kB`;
    }
    else if(base < 1000000000) {
      return `${oldSize/1000000} MB`;
    }
    else {
      return `${oldSize/1000000000} GB`;
    }
  }

  getCurrentSize() {
    return this.currentSize;
  }

  getTotalSize() {
    return this.totalSize;
  }

  getTransferPercent() {
    return this.getCurrentSize()/this.getTotalSize()*100;
  }

  cancelTransfer() {
    console.log("Transfer canceled");
  }

  handleApproval(isApproved: boolean) {
    if(isApproved) {
      this.stepper.selectedIndex = 1;
    } else {
      this.cancelTransfer();
    }
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });

    this.createUrl();
    // this.peerService.receiveData(this.receiverLocation);
    this.peerService.receivedData.subscribe(
      data => {
        console.log('onNext: %s', data)
        this.receiverLocation.latitude = data[0].latitude;
        this.receiverLocation.longitude = data[0].Location;
        this.receiverLocation.city = data[0].city;
        this.receiverLocation.state = data[0].state;
        this.receiverLocation.country = data[0].country;
      },
      error => {
        console.log('onError: %s', error)
      },
      () => {
        console.log('onCompleted')
      }
    );
  }

}
