import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeerService } from '../../shared/api/peer.service';
import { Location } from '../../shared/api/location';
import { FileService } from '../../shared/api/file.service';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-file-transfer-stepper',
  templateUrl: './file-transfer-stepper.component.html',
  styleUrls: ['./file-transfer-stepper.component.scss']
})
export class FileTransferStepperComponent implements OnInit {

  domainName: string = "owlobby.com"
  firstFormGroup: FormGroup;
  connectionUrl: string = '';
  peerId: any;
  remotePeerId: any;
  receiverLocation: Location;
  isApproved: boolean = false;
  file: File;
  @ViewChild('stepper') stepper;

  constructor(private _formBuilder: FormBuilder,
    private peerService: PeerService,
    private fileService: FileService,
    private snackBar: MatSnackBar) {
    this.file = this.fileService.getFile();
  }

  getPeerId() {
    this.peerId = this.peerService.getPeerId();
  }

  createUrl() {
    this.connectionUrl = this.peerService.createUrl();
    var sessionInt = setInterval(() =>{
      if (sessionStorage.getItem('peerId') != null && sessionStorage.getItem('location') != null) {
        console.log("Connection detected!");
        this.remotePeerId = sessionStorage.getItem('peerId');
        // Set local location object from session storage
        var storedLoc = sessionStorage.getItem('location').split(',');
        console.log(storedLoc);
        this.receiverLocation = new Location(
          Number(storedLoc[0]),
          Number(storedLoc[1]),
          storedLoc[2],
          storedLoc[3],
          storedLoc[4]
        );
        console.log(this.remotePeerId, JSON.stringify(this.receiverLocation));
        sessionStorage.removeItem('peerId');
        sessionStorage.removeItem('location');
        this.sendFile();
        clearInterval(sessionInt);
      }
    }, 2000);
  }

  sendFile() {
    var sessIt = setInterval(() => {
      if (this.isApproved) {
        this.peerService.sendFile(this.file, this.remotePeerId);
        clearInterval(sessIt);
      }
    }, 2000);
  }

  abbreviateFileSize(oldSize: number, base: number) {
    if (base < 1000) {
      return `{oldSize} bytes`;
    }
    else if (base < 1000000) {
      return `${oldSize / 1000} kB`;
    }
    else if (base < 1000000000) {
      return `${oldSize / 1000000} MB`;
    }
    else {
      return `${oldSize / 1000000000} GB`;
    }
  }

  handleApproval(isApproved: boolean) {
    if (isApproved) {
      this.isApproved = true;
      this.stepper.selectedIndex = 1;
    }
  }

  copy(textToCopy: string) {
    
    // Temporarily create invisible element on screen to copy text from
    let selBox = document.createElement('textarea');

    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = textToCopy;

    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();

    document.execCommand('copy');
    document.body.removeChild(selBox);

    let snackBarRef = this.snackBar.open("File URL copied to clipboard", "", { duration: 2500 });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });

    this.createUrl();
  }

}
