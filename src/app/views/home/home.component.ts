import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../shared/api/peer.service';
import { FileService } from '../../shared/api/file.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  peerId: string;
  fileName: string;
	
  constructor(private peerService: PeerService,
              private fileService: FileService) { }

  ngOnInit() { }

  getPeerId() {
    this.peerId = this.peerService.getPeerId();
  }
  
  fileEvent(fileInput: HTMLInputEvent){
    let fileList = fileInput.target.files;
    this.fileName = fileList[0].name;
    this.fileService.setFile(fileList[0]);
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}