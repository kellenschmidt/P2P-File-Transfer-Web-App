import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-file-transfer',
  templateUrl: './file-transfer.component.html',
  styleUrls: ['./file-transfer.component.scss']
})
export class FileTransferComponent implements OnInit {

  currentSize: number = 1100000;
  totalSize: number = 2200000000;

  constructor() { }

  ngOnInit() {
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

}
