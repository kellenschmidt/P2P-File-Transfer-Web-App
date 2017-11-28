import { Component, OnInit } from '@angular/core';
import { PeerService } from '../../shared/api/peer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  
  peerId: string;
  fileList: FileList;
  fileName: string;
	
  constructor(private peerService: PeerService) { }

  ngOnInit() { }

  getPeerId() {
    this.peerId = this.peerService.getPeerId();
  }
  
  fileEvent(fileInput: HTMLInputEvent){
    this.fileList = fileInput.target.files;
    this.fileName = this.fileList[0].name;
  }

}

interface HTMLInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}